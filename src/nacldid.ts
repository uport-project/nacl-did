import { Resolver, DIDDocument, ParsedDID, parse } from 'did-resolver'
import nacl from 'tweetnacl'
import naclutil from 'tweetnacl-util'
import { convertKeyPair, convertPublicKey } from 'ed2curve-esm'

export const ASYM_CIPHER_VERSION = 'x25519-xsalsa20-poly1305'
export const SYM_CIPHER_VERSION = 'xsalsa20-poly1305'

interface EncryptedTemplate {
  to: string
  from?: string
  version: string
  toPublicKey?: string
}

export interface Encrypted extends EncryptedTemplate {
  nonce: string
  ciphertext: string
}

interface NaCLKeyPair {
  publicKey: Uint8Array
  secretKey: Uint8Array
}

export interface SerializableNaCLIdentity {
  did: string
  privateKey: string
}

export interface SignedData {
  signer: string
  data: string | Uint8Array
  signature: Uint8Array
}

interface JOSEHeader {
  type: string
  alg: string
}

export interface VerifiedJWT {
  issuer: string
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

async function naclRandomBytes (length: number): Promise<Uint8Array> {
  return nacl.randomBytes(length)
}

let randomBytes: RandomBytesSource = naclRandomBytes

/**
 * Sets a system wide random byte source
 * @param source an async function generating random bytes
 */
export function setRandomBytesSource (source: RandomBytesSource) {
  randomBytes = source
}

/**
 * Takes data which could be a string or a Uint8Array and normalizes it into a Uint8Array
 */
export function normalizeClearData (data: string | Uint8Array): Uint8Array {
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
export function encodeBase64Url (data: Uint8Array): string {
  return naclutil
    .encodeBase64(data)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

function pad (base64url: string): string {
  switch (base64url.length % 4) {
    case 0:
      return base64url
    case 2:
      return base64url + '=='
    case 3:
      return base64url + '='
    default:
      throw new Error('Invalid base64url encoded string')
  }
}

/**
 * Decodes a base64url encoded string into a Uint8Array (byte array)
 * @param base64url base64url encoded string
 */
export function decodeBase64Url (base64url: string): Uint8Array {
  return naclutil.decodeBase64(
    pad(base64url)
      .replace(/-/g, '+')
      .replace(/_/g, '/')
  )
}

const JOSE_HEADER = { typ: 'JWT', alg: 'Ed25519' }
const ENCODED_JOSE_HEADER = encodeBase64Url(
  naclutil.decodeUTF8(JSON.stringify(JOSE_HEADER))
)

/**
 * Encapsulates the functionality of an identity using the `nacl-did` method
 */
export class NaCLIdentity {
  readonly did: string
  readonly publicKey: Uint8Array
  readonly encPublicKey: Uint8Array
  private readonly privateKey: Uint8Array
  private readonly encPrivateKey: Uint8Array
  private readonly resolver: Resolver
  /**
   * Create a new NaCL Identity for a KeyPair
   *
   * @param kp a KeyPair generated prior from nacl.box.keyPair()
   */
  constructor (kp: NaCLKeyPair, didResolver?: Resolver) {
    this.did = `did:nacl:${encodeBase64Url(kp.publicKey)}`
    this.privateKey = kp.secretKey
    this.publicKey = kp.publicKey
    const encKP = convertKeyPair(kp)
    this.encPublicKey = encKP.publicKey
    this.encPrivateKey = encKP.secretKey
    this.resolver = didResolver || new Resolver({ nacl: resolver })
  }

  /**
   * Serializes NaclDID to just it's base64 encoded private key and DID
   */
  toJSON (): SerializableNaCLIdentity {
    return { did: this.did, privateKey: naclutil.encodeBase64(this.privateKey) }
  }

  /**
   * Signs data and returns the data, did and signature
   * @param data
   */
  sign (data: string | Uint8Array): SignedData {
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
  verify (signed: SignedData): boolean {
    return nacl.sign.detached.verify(
      normalizeClearData(signed.data),
      signed.signature,
      this.publicKey
    )
  }

  /**
   * Creates a signed JWT using the following header `{ typ: 'JWT', alg: 'Ed25519' }`
   * @param payload Any valid JSON encodeable JS object
   */
  createJWT (payload: Object) {
    const iat = Math.floor(Date.now() / 1000)
    const unsigned =
      ENCODED_JOSE_HEADER +
      '.' +
      encodeBase64Url(
        naclutil.decodeUTF8(JSON.stringify({ ...payload, iss: this.did, iat }))
      )
    const signed = this.sign(unsigned)
    return unsigned + '.' + encodeBase64Url(signed.signature)
  }

  async resolveEncryptionPublicKey (
    did: string
  ): Promise<Uint8Array | undefined> {
    try {
      const doc = await this.resolver.resolve(did)
      if (doc) {
        const publicKey = doc.publicKey.find(
          pub => pub.type === 'Curve25519EncryptionPublicKey'
        )
        if (publicKey && publicKey.publicKeyBase64)
          return naclutil.decodeBase64(publicKey.publicKeyBase64)
      }
    } catch (error) {
      // console.log(error.message)
    }
  }

  /**
   * Opens an efficient session for encrypting and decrypting messages between this and another DID.
   *
   * An optional publicKey that has been exchanged out of band can be passed into the second parameter. This
   * will ONLY be used if no encryption public key was found in DID document.
   *
   * If you would like to encrypt things to your self regardless if a public key was not found, pass in the value of `true` as the second argument.
   * It will then be encrypted symetrically instead.
   *
   * @param to DID of recipient
   * @param overridePublicKey If DID method does not contain an encryption public key use this key
   *
   */
  async openSession (
    to: string,
    overridePublicKey: boolean | string = false
  ): Promise<EncryptedSession> {
    if (to === this.did) return new SymEncryptedSession(this)
    let publicKey = await this.resolveEncryptionPublicKey(to)
    if (!publicKey) {
      if (typeof overridePublicKey === 'string') {
        publicKey = naclutil.decodeBase64(overridePublicKey)
      } else {
        if (overridePublicKey === true) {
          return new SymEncryptedSession(this)
        } else
          throw new Error(
            `Recipient DID ${to} does not have a valid encryption publicKey`
          )
      }
    }
    return new AsymEncryptedSession(
      this.did,
      to,
      naclutil.encodeBase64(publicKey),
      nacl.box.before(publicKey, this.encPrivateKey)
    )
  }

  /**
   * Encrypt a single message to send to a recipient
   * @param to DID of recipient (uses symetric encryption if to is my own DID)
   * @param data Data to encrypt
   */
  async encrypt (to: string, data: string | Uint8Array): Promise<Encrypted> {
    if (to === this.did) {
      const nonce = await randomBytes(nacl.secretbox.nonceLength)
      const ciphertext = nacl.secretbox(
        normalizeClearData(data),
        nonce,
        this.encPrivateKey
      )
      return {
        to: to,
        nonce: naclutil.encodeBase64(nonce),
        ciphertext: naclutil.encodeBase64(ciphertext),
        version: SYM_CIPHER_VERSION
      }
    } else {
      const toPubKey = didToEncPubKey(to)
      const nonce = await randomBytes(nacl.box.nonceLength)
      const ciphertext = nacl.box(
        normalizeClearData(data),
        nonce,
        toPubKey,
        this.encPrivateKey
      )
      return {
        to,
        from: this.did,
        toPublicKey: naclutil.encodeBase64(toPubKey),
        nonce: naclutil.encodeBase64(nonce),
        ciphertext: naclutil.encodeBase64(ciphertext),
        version: ASYM_CIPHER_VERSION
      }
    }
  }

  // Decrypt a single message
  decrypt ({ from, to, nonce, ciphertext, version }: Encrypted): string {
    switch (version) {
      case ASYM_CIPHER_VERSION:
        if (from !== this.did && to !== this.did)
          throw new Error(`This was not encrypted to ${this.did}`)
        const other = from === this.did ? to : from
        if (!other) throw new Error('No counter party included')
        return naclutil.encodeUTF8(
          <Uint8Array>(
            nacl.box.open(
              naclutil.decodeBase64(ciphertext),
              naclutil.decodeBase64(nonce),
              didToEncPubKey(other),
              this.encPrivateKey
            )
          )
        )
      case SYM_CIPHER_VERSION:
        if (to !== this.did)
          throw new Error(`This was not encrypted to ${this.did}`)
        return naclutil.encodeUTF8(
          <Uint8Array>(
            nacl.secretbox.open(
              naclutil.decodeBase64(ciphertext),
              naclutil.decodeBase64(nonce),
              this.encPrivateKey
            )
          )
        )
      default:
        throw new Error(`We do not support ${version}`)
    }
  }
}

export abstract class EncryptedSession {
  readonly to: string
  constructor (to: string) {
    this.to = to
  }
  abstract async encrypt (data: string | Uint8Array): Promise<Encrypted>
  abstract decrypt (encrypted: Encrypted): string
}
class AsymEncryptedSession extends EncryptedSession {
  readonly from: string
  readonly toPublicKey: string
  private readonly template: EncryptedTemplate
  private sharedKey: Uint8Array

  constructor (
    from: string,
    to: string,
    toPublicKey: string,
    sharedKey: Uint8Array
  ) {
    super(to)
    this.from = from
    this.sharedKey = sharedKey
    this.toPublicKey = toPublicKey
    this.template = {
      toPublicKey,
      from,
      to,
      version: ASYM_CIPHER_VERSION
    }
  }

  /**
   * Encrypt data to recipient
   * @param data
   */
  async encrypt (data: string | Uint8Array): Promise<Encrypted> {
    const nonce = await randomBytes(nacl.box.nonceLength)
    const ciphertext = nacl.box.after(
      normalizeClearData(data),
      nonce,
      this.sharedKey
    )
    return {
      ...this.template,
      nonce: naclutil.encodeBase64(nonce),
      ciphertext: naclutil.encodeBase64(ciphertext)
    }
  }

  /**
   * Decrypt data from counter party or myself
   */
  decrypt ({ from, to, nonce, ciphertext, version }: Encrypted): string {
    if (version !== ASYM_CIPHER_VERSION)
      throw new Error(`We do not support ${version}`)
    if (from !== this.from && to !== this.to)
      throw new Error(`This was not encrypted to us`)
    return naclutil.encodeUTF8(
      <Uint8Array>(
        nacl.box.open.after(
          naclutil.decodeBase64(ciphertext),
          naclutil.decodeBase64(nonce),
          this.sharedKey
        )
      )
    )
  }
}

class SymEncryptedSession extends EncryptedSession {
  private readonly id: NaCLIdentity
  constructor (id: NaCLIdentity) {
    super(id.did)
    this.id = id
  }

  /**
   * Encrypt data to recipient
   * @param data
   */
  async encrypt (data: string | Uint8Array): Promise<Encrypted> {
    return this.id.encrypt(this.to, data)
  }

  /**
   * Decrypt data from counter party
   */
  decrypt (encrypted: Encrypted): string {
    return this.id.decrypt(encrypted)
  }
}

/**
 * Verify Signature of Signed Data
 * @param signed
 */
export function verifySignature (signed: SignedData): boolean {
  const publicKey = didToSignPubKey(signed.signer)
  return nacl.sign.detached.verify(
    normalizeClearData(signed.data),
    signed.signature,
    publicKey
  )
}

/**
 * Verify JWT of type `{ typ: 'JWT', alg: 'Ed25519' }`
 * @param jwt
 */
export function verifyJWT (jwt: string): VerifiedJWT {
  const parts = jwt.split('.')
  if (parts[0] !== ENCODED_JOSE_HEADER) throw new Error('Incorrect JWT Type')
  const payload = JSON.parse(naclutil.encodeUTF8(decodeBase64Url(parts[1])))
  if (!payload.iss) throw new Error('JWT did not contain an `iss`')
  if (payload.exp !== undefined) {
    if (typeof payload.exp !== 'number')
      throw new Error(
        `Invalid exp in JWT ${payload.exp} = ${typeof payload.exp}`
      )
    const exp = payload.exp * 1000
    if (exp < new Date().getTime()) {
      throw new Error(`JWT expired on: ${payload.exp}`)
    }
  }
  if (
    verifySignature({
      signer: payload.iss,
      data: `${parts[0]}.${parts[1]}`,
      signature: decodeBase64Url(parts[2])
    })
  ) {
    return { issuer: payload.iss, payload }
  } else {
    throw new Error('JWT could not be verified')
  }
}

function didToSignPubKey (did: string) {
  const parsed = parse(did)
  return decodeBase64Url(parsed.id)
}

export function didToEncPubKey (did: string): Uint8Array {
  if (!did.match(/^did:nacl:/)) throw new Error('Only nacl dids are supported')
  return convertPublicKey(didToSignPubKey(did))
}

/**
 * Create a new NaCLIDentity
 */
export function createIdentity (didResolver?: Resolver): NaCLIdentity {
  return new NaCLIdentity(nacl.sign.keyPair(), didResolver)
}

/**
 * Instantiates a Serialized NaCLIDentity
 * @param sId
 */
export function loadIdentity (
  sId: SerializableNaCLIdentity,
  didResolver?: Resolver
): NaCLIdentity {
  const id = new NaCLIdentity(
    nacl.sign.keyPair.fromSecretKey(naclutil.decodeBase64(sId.privateKey)),
    didResolver
  )
  if (id.did !== sId.did)
    throw new Error('Provided PrivateKey does not match the DID')
  return id
}

/**
 * Registers `nacl` DID resolver
 */
export async function resolver (
  did: string,
  parsed: ParsedDID
): Promise<DIDDocument | null> {
  const publicKey = decodeBase64Url(parsed.id)
  return {
    '@context': 'https://w3id.org/did/v1',
    id: did,
    publicKey: [
      {
        id: `${did}#key1`,
        type: 'ED25519SignatureVerification',
        owner: did,
        publicKeyBase64: naclutil.encodeBase64(publicKey)
      },
      {
        id: `${did}#key2`,
        type: 'Curve25519EncryptionPublicKey',
        owner: did,
        publicKeyBase64: naclutil.encodeBase64(convertPublicKey(publicKey))
      }
    ],
    authentication: [
      {
        type: 'ED25519SigningAuthentication',
        publicKey: `${did}#key1`
      }
    ]
  }
}
