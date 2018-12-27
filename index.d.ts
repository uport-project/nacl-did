/**
 * Missing modules
 */

interface NaCLKeyPair {
  publicKey: Uint8Array
  secretKey: Uint8Array
}

declare module 'ed2curve' {
  export function convertKeyPair(kp: NaCLKeyPair): NaCLKeyPair
  export function convertPublicKey(publicKey: Uint8Array): Uint8Array
}
