import resolve, { registerMethod, DIDDocument, ParsedDID, parse } from 'did-resolver'
import nacl from 'tweetnacl'
import naclutil from 'tweetnacl-util'
import { convertKeyPair, convertPublicKey } from 'ed2curve'

export const CIPHER_VERSION = 'x25519-xsalsa20-poly1305'

interface EncryptedTemplate {
  to: string
  from: string
  version: string
  toPublicKey: string
}

export interface Encrypted extends EncryptedTemplate {
  nonce: string
  ciphertext: string,
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

/**
 * Implement this to use a custom async random source
 * @param length is the length of the Random Bytes requested.
 * @returns a Promise returning a Uint8Array
 */
export interface RandomBytesSource {
  (length: number): Promise<Uint8Array>
}

async function naclRandomBytes(length: number): Promise<Uint8Array> {
  return nacl.randomBytes(length)
}

let randomBytes: RandomBytesSource = naclRandomBytes

/**
 * Sets a system wide random byte source
 * @param source an async function generating random bytes
 */
export function setRandomBytesSource(source: RandomBytesSource) {
  randomBytes = source
}

/**
 * Takes data which could be a string or a Uint8Array and normalizes it into a Uint8Array
 */
export function normalizeClearData(data: string | Uint8Array): Uint8Array {
  if (typeof data === 'string') {
    return naclutil.decodeUTF8(data)
  } else {
    return <Uint8Array>data
  }
}

/**
 * Encode a byte array into a base64 url encoded string
 * @param data data to encode
 */
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


/**
 * Decodes a base64url encoded string into a Uint8Array (byte array)
 * @param base64url base64url encoded string
 */
export function decodeBase64Url(base64url: string): Uint8Array {
  return naclutil.decodeBase64(pad(base64url).replace(/-/g, '+').replace(/_/g, '/'))
}

const JOSE_HEADER = { typ: 'JWT', alg: 'Ed25519' }
const ENCODED_JOSE_HEADER = encodeBase64Url(naclutil.decodeUTF8(JSON.stringify(JOSE_HEADER)))

/**
 * Encapsulates the functionality of an identity using the `nacl-did` method
 */
export class NaCLIdentity {
  readonly did: string
  private readonly privateKey: Uint8Array
  private readonly encPrivateKey: Uint8Array
  readonly publicKey: Uint8Array
  readonly encPublicKey: Uint8Array

  /**
   * Create a new NaCL Identity for a KeyPair
   * 
   * @param kp a KeyPair generated prior from nacl.box.keyPair()
   */
  constructor(kp: NaCLKeyPair) {
    this.did = `did:nacl:${encodeBase64Url(kp.publicKey)}`
    this.privateKey = kp.secretKey
    this.publicKey = kp.publicKey
    const encKP = convertKeyPair(kp)
    this.encPublicKey = encKP.publicKey
    this.encPrivateKey = encKP.secretKey
  }

  /**
   * Serializes NaclDID to just it's base64 encoded private key and DID
   */
  toJSON(): SerializableNaCLIdentity {
    return { did: this.did, privateKey: naclutil.encodeBase64(this.privateKey) }
  }

  /**
   * Signs data and returns the data, did and signature
   * @param data
   */
  sign(data: string | Uint8Array): SignedData {
    return {
      data,
      signer: this.did,
      signature: nacl.sign.detached(normalizeClearData(data), this.privateKey)
    }
  }

  /**
   * Verifies that Signed Data was signed by this identity
   * @param signed 
   */
  verify(signed: SignedData): boolean {
    return nacl.sign.detached.verify(normalizeClearData(signed.data), signed.signature, this.publicKey)
  }

  /**
   * Creates a signed JWT using the following header `{ typ: 'JWT', alg: 'Ed25519' }`
   * @param payload Any valid JSON encodeable JS object
   */
  createJWT(payload: Object) {
    const iat = Math.floor(Date.now() / 1000)
    const unsigned = ENCODED_JOSE_HEADER + '.' + encodeBase64Url(naclutil.decodeUTF8(JSON.stringify({ ...payload, iss: this.did, iat })))
    const signed = this.sign(unsigned)
    return unsigned + '.' + encodeBase64Url(signed.signature)
  }

  /**
   * Opens an efficient session for encrypting and decrypting messages between this and another DID.
   * 
   * @param to DID of recipient
   * @param overridePublicKey If DID method does not contain an encryption public key use this key or `true` to create a new ephemeral key
   */
  async openSession(to: string, overridePublicKey: boolean | string = false): Promise<EncryptedSession> {
    // If recipient doesn't have a valid publicKey create an ephemeral one
    // This means that I at least have the session encrypted to myself
    let publicKey = await resolveEncryptionPublicKey(to)
    if (!publicKey) {
      if (overridePublicKey) {
        if (typeof overridePublicKey === 'string') {
          publicKey = naclutil.decodeBase64(<string>overridePublicKey)
        } else {
          publicKey = nacl.randomBytes(32)
        }
      } else throw new Error(`Recipient DID ${to} does not have a valid encryption publicKey`)
    }
    return new EncryptedSession(this.did, to, naclutil.encodeBase64(publicKey), nacl.box.before(publicKey, this.encPrivateKey))
  }

  /**
   * Encrypt a single message to send to a recipient
   * @param to DID of recipient
   * @param data Data to encrypt
   */
  async encrypt(to: string, data: string | Uint8Array): Promise<Encrypted> {
    const toPubKey = didToEncPubKey(to)
    const nonce = await randomBytes(nacl.box.nonceLength)
    const ciphertext = nacl.box(normalizeClearData(data), nonce, toPubKey, this.encPrivateKey)
    return {
      to: to,
      from: this.did,
      toPublicKey: naclutil.encodeBase64(toPubKey),
      nonce: naclutil.encodeBase64(nonce),
      ciphertext: naclutil.encodeBase64(ciphertext),
      version: CIPHER_VERSION
    }
  }

  // Decrypt a single message
  decrypt({ from, to, nonce, ciphertext, version }: Encrypted) {
    if (version !== CIPHER_VERSION) throw new Error(`We do not support ${version}`)
    if (from !== this.did && to !== this.did) throw new Error(`This was not encrypted to ${this.did}`)
    const other = from === this.did ? to : from
    if (!other) throw new Error('No counter party included')
    return nacl.box.open(naclutil.decodeBase64(ciphertext), naclutil.decodeBase64(nonce), didToEncPubKey(other), this.encPrivateKey)
  }
}

export class EncryptedSession {
  public readonly from: string
  public readonly to: string
  public readonly toPublicKey: string
  private readonly template: EncryptedTemplate
  private sharedKey: Uint8Array

  constructor(from: string, to: string, toPublicKey: string, sharedKey: Uint8Array) {
    this.from = from
    this.to = to
    this.sharedKey = sharedKey
    this.toPublicKey = toPublicKey
    this.template = {
      toPublicKey,
      from,
      to,
      version: CIPHER_VERSION
    }
  }

  /**
   * Encrypt data to recipient
   * @param data 
   */
  async encrypt(data: string | Uint8Array): Promise<Encrypted> {
    if (!this.isOpen()) throw new Error(`Session with ${this.to} has been closed`)
    const nonce = await randomBytes(nacl.box.nonceLength)
    const ciphertext = nacl.box.after(normalizeClearData(data), nonce, this.sharedKey)
    return {
      ...this.template,
      nonce: naclutil.encodeBase64(nonce),
      ciphertext: naclutil.encodeBase64(ciphertext),
    }
  }

  /**
   * Decrypt data from counter party
   */
  decrypt({ from, to, nonce, ciphertext, version }: Encrypted) {
    if (!this.isOpen()) throw new Error(`Session with ${this.to} has been closed`)
    if (version !== CIPHER_VERSION) throw new Error(`We do not support ${version}`)
    if (from !== this.from && to !== this.to) throw new Error(`This was not encrypted to us`)
    return nacl.box.open.after(naclutil.decodeBase64(ciphertext), naclutil.decodeBase64(nonce), this.sharedKey)
  }

  isOpen() {
    return this.sharedKey.length > 0
  }

  close() {
    this.sharedKey.fill(0)
    this.sharedKey = new Uint8Array(0)
  }
}

/**
 * Verify Signature of Signed Data
 * @param signed 
 */
export function verifySignature(signed: SignedData): boolean {
  const publicKey = didToSignPubKey(signed.signer)
  return nacl.sign.detached.verify(normalizeClearData(signed.data), signed.signature, publicKey)
}

/**
 * Verify JWT of type `{ typ: 'JWT', alg: 'Ed25519' }`
 * @param jwt 
 */
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

async function resolveEncryptionPublicKey(did: string): Promise<Uint8Array | undefined> {
  const doc = await resolve(did)
  if (doc) {
    const publicKey = doc.publicKey.find(pub => pub.type === 'Curve25519EncryptionPublicKey')
    if (publicKey && publicKey.publicKeyBase64) return naclutil.decodeBase64(publicKey.publicKeyBase64)
  }
}

export function didToEncPubKey(did: string): Uint8Array {
  if (!did.match(/^did:nacl:/)) throw new Error('Only nacl dids are supported')
  return convertPublicKey(didToSignPubKey(did))
}

/**
 * Create a new NaCLIDentity
 */
export function createIdentity(): NaCLIdentity {
  return new NaCLIdentity(nacl.sign.keyPair())
}

/**
 * Instantiates a Serialized NaCLIDentity
 * @param sId 
 */
export function loadIdentity(sId: SerializableNaCLIdentity): NaCLIdentity {
  const id = new NaCLIdentity(nacl.sign.keyPair.fromSecretKey(naclutil.decodeBase64(sId.privateKey)))
  if (id.did !== sId.did) throw new Error('Provided PrivateKey does not match the DID')
  return id
}

/**
 * Registers `nacl` DID resolver
 */
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
