import { registerMethod, DIDDocument, ParsedDID, parse } from 'did-resolver'
import nacl from 'tweetnacl'
import naclutil from 'tweetnacl-util'
import { convertKeyPair, convertPublicKey } from 'ed2curve'

export const CIPHER_VERSION = 'x25519-xsalsa20-poly1305'

interface Encrypted {
  parties: string[]
  version: string
  nonce: string
  ciphertext: string
}

interface NaCLKeyPair {
  publicKey: Uint8Array
  secretKey: Uint8Array
}

interface SerializableNaCLIdentity {
  did: string
  privateKey: string
}

interface SignedData {
  signer: string
  data: string | Uint8Array
  signature: Uint8Array
}

interface JOSEHeader {
  type: string,
  alg: string
}

interface VerifiedJWT {
  issuer: string,
  payload: any
}

export function normalizeClearData(data: string | Uint8Array): Uint8Array {
  if (typeof data === 'string') {
    return naclutil.decodeUTF8(data)
  } else {
    return <Uint8Array>data
  }
}

export function encodeBase64Url(data: Uint8Array): string {
  return naclutil.encodeBase64(data).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

function pad(base64url: string): string {
  switch (base64url.length % 4) {
    case 0: return base64url
    case 2: return base64url + '=='
    case 3: return base64url + '='
    default: throw new Error('Invalid base64url encoded string')
  }
}
export function decodeBase64Url(base64url: string): Uint8Array {
  return naclutil.decodeBase64(pad(base64url).replace(/-/g, '+').replace(/_/g, '/'))
}

const JOSE_HEADER = { typ: 'JWT', alg: 'Ed25519' }
const ENCODED_JOSE_HEADER = encodeBase64Url(naclutil.decodeUTF8(JSON.stringify(JOSE_HEADER)))

class NaCLIdentity {
  readonly did: string
  private readonly privateKey: Uint8Array
  private readonly publicKey: Uint8Array
  private readonly encPublicKey: Uint8Array
  private readonly encPrivateKey: Uint8Array

  constructor(kp: NaCLKeyPair) {
    this.did = `did:nacl:${encodeBase64Url(kp.publicKey)}`
    this.privateKey = kp.secretKey
    this.publicKey = kp.publicKey
    const encKP = convertKeyPair(kp)
    this.encPublicKey = encKP.publicKey
    this.encPrivateKey = encKP.secretKey
  }

  toJSON(): SerializableNaCLIdentity {
    return { did: this.did, privateKey: naclutil.encodeBase64(this.privateKey) }
  }

  sign(data: string | Uint8Array): SignedData {
    return {
      data,
      signer: this.did,
      signature: nacl.sign.detached(normalizeClearData(data), this.privateKey)
    }
  }

  verify(signed: SignedData): boolean {
    return nacl.sign.detached.verify(normalizeClearData(signed.data), signed.signature, this.publicKey)
  }

  createJWT(payload: Object) {
    const iat = Math.floor(Date.now() / 1000)
    const unsigned = ENCODED_JOSE_HEADER + '.' + encodeBase64Url(naclutil.decodeUTF8(JSON.stringify({ ...payload, iss: this.did, iat })))
    const signed = this.sign(unsigned)
    return unsigned + '.' + encodeBase64Url(signed.signature)
  }

  encrypt(recipient: string, data: string | Uint8Array): Encrypted {
    const recipientPubKey = didToEncPubKey(recipient)
    const nonce = nacl.randomBytes(nacl.box.nonceLength)
    const ciphertext = nacl.box(normalizeClearData(data), nonce, recipientPubKey, this.encPrivateKey)
    return {
      parties: [this.did, recipient],
      nonce: naclutil.encodeBase64(nonce),
      ciphertext: naclutil.encodeBase64(ciphertext),
      version: CIPHER_VERSION
    }
  }

  decrypt({ parties, nonce, ciphertext, version }: Encrypted) {
    if (version !== CIPHER_VERSION) throw new Error(`We do not support ${version}`)
    if (!parties.find(did => did === this.did)) throw new Error(`This was not encrypted to ${this.did}`)
    const other = parties.find(did => did !== this.did)
    if (!other) throw new Error('No counter party included')
    return nacl.box.open(naclutil.decodeBase64(ciphertext), naclutil.decodeBase64(nonce), didToEncPubKey(other), this.encPrivateKey)
  }
}

export function verifySignature(signed: SignedData): boolean {
  const publicKey = didToSignPubKey(signed.signer)
  return nacl.sign.detached.verify(normalizeClearData(signed.data), signed.signature, publicKey)
}

export function verifyJWT(jwt: string): VerifiedJWT {
  const parts = jwt.split('.')
  if (parts[0] !== ENCODED_JOSE_HEADER) throw new Error('Incorrect JWT Type')
  const payload = JSON.parse(naclutil.encodeUTF8(decodeBase64Url(parts[1])))
  if (!payload.iss) throw new Error('JWT did not contain an `iss`')
  if (verifySignature({ signer: payload.iss, data: `${parts[0]}.${parts[1]}`, signature: decodeBase64Url(parts[2]) })) {
    return { issuer: payload.iss, payload }
  } else {
    throw new Error('JWT could not be verified')
  }
}

function didToSignPubKey(did: string) {
  const parsed = parse(did)
  return decodeBase64Url(parsed.id)
}

function didToEncPubKey(did: string) {
  return convertPublicKey(didToSignPubKey(did))
}

export function createIdentity(): NaCLIdentity {
  return new NaCLIdentity(nacl.sign.keyPair())
}

export function loadIdentity(sId: SerializableNaCLIdentity): NaCLIdentity {
  const id = new NaCLIdentity(nacl.sign.keyPair.fromSecretKey(naclutil.decodeBase64(sId.privateKey)))
  if (id.did !== sId.did) throw new Error('Provided PrivateKey does not match the DID')
  return id
}

export default function register() {
  async function resolve(
    did: string,
    parsed: ParsedDID,
  ): Promise<DIDDocument | null> {
    const publicKey = decodeBase64Url(parsed.id)
    return {
      '@context': 'https://w3id.org/did/v1',
      id: did,
      publicKey: [{
        id: `${did}#key1`,
        type: 'ED25519SignatureVerification',
        owner: did,
        publicKeyBase64: naclutil.encodeBase64(publicKey)
      }, {
        id: `${did}#key2`,
        type: 'Curve25519EncryptionPublicKey',
        owner: did,
        publicKeyBase64: naclutil.encodeBase64(convertPublicKey(publicKey))
      }],
      authentication: [{
        type: 'ED25519SigningAuthentication',
        publicKey: `${did}#key1`
      }]
    }
  }
  registerMethod('nacl', resolve)
}
