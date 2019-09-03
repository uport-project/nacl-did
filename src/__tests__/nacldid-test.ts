import {
  check,
  Fuzzer,
  string,
  posInteger,
  object,
  asciiString
} from 'kitimat-jest'
import {
  resolver,
  createIdentity,
  loadIdentity,
  verifySignature,
  verifyJWT,
  encodeBase64Url,
  decodeBase64Url,
  EncryptedSession,
  Encrypted
} from '../nacldid'
import { Resolver, DIDDocument, ParsedDID } from 'did-resolver'
import naclutil from 'tweetnacl-util'
import nacl from 'tweetnacl'

import MockDate from 'mockdate'

const NOW = 1485321133
MockDate.set(NOW * 1000)

async function fakeEthrDidResolver(
  did: string,
  parsed: ParsedDID
): Promise<DIDDocument | null> {
  return {
    '@context': 'https://w3id.org/did/v1',
    id: did,
    publicKey: [
      {
        id: `${did}#key1`,
        type: 'Secp256k1VerificationKey2018',
        owner: did,
        ethereumAddress: parsed.id
      }
    ],
    authentication: [
      {
        type: 'Secp256k1SignatureAuthentication2018',
        publicKey: `${did}#key1`
      }
    ]
  }
}

const didResolver = new Resolver({ nacl: resolver, ethr: fakeEthrDidResolver })

const clearTexts: Fuzzer<string> = string()
const byteArrays: Fuzzer<Uint8Array> = posInteger({ maxSize: 10000 }).map(i =>
  nacl.randomBytes(i)
)

describe('nacl did resolver', () => {
  const did: string = 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI'
  const validDidDoc = {
    '@context': 'https://w3id.org/did/v1',
    id: did,
    publicKey: [
      {
        id: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key1`,
        type: 'ED25519SignatureVerification',
        owner: did,
        publicKeyBase64: 'Md8JiMIwsapml/FtQ2ngnGftNP5UmVCAUuhnLyAsPxI='
      },
      {
        id: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key2`,
        type: 'Curve25519EncryptionPublicKey',
        owner: did,
        publicKeyBase64: 'OAsnUyuUBISGsOherdxO6rgzUeGe9SnffDXQk6KpkAY='
      }
    ],
    authentication: [
      {
        type: 'ED25519SigningAuthentication',
        publicKey: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key1`
      }
    ]
  }

  it('resolves document', () => {
    return expect(didResolver.resolve(did)).resolves.toEqual(validDidDoc)
  })
})

describe('createIdentity()', () => {
  const id = createIdentity(didResolver)

  it('should have a did', () => {
    expect(id.did).toMatch(/^did:nacl:[a-zA-Z0-9-_]+$/)
  })

  describe('serialization', () => {
    const serialized = id.toJSON()
    it('should be serializable', () => {
      expect(id.toJSON()).toEqual(serialized)
    })

    it('should be loadable', () => {
      expect(loadIdentity(serialized, didResolver)).toEqual(id)
    })
  })

  describe('sign()', () => {
    const malory = createIdentity()
    const other = id.sign('something completely different')
    check('strings', [clearTexts], clear => {
      const signed = id.sign(clear)
      expect(signed.data).toEqual(clear)
      expect(id.verify(signed)).toBeTruthy()
      expect(id.verify({ ...signed, signature: other.signature })).toBeFalsy()
      expect(verifySignature(signed)).toBeTruthy()
      expect(verifySignature({ ...signed, signer: malory.did })).toBeFalsy()
    })

    check('bytearrays', [byteArrays], clear => {
      const signed = id.sign(clear)
      expect(signed.data).toEqual(clear)
      expect(id.verify(signed)).toBeTruthy()
      expect(id.verify({ ...signed, signature: other.signature })).toBeFalsy()
      expect(verifySignature(signed)).toBeTruthy()
      expect(verifySignature({ ...signed, signer: malory.did })).toBeFalsy()
    })
  })

  describe('JWT', () => {
    describe('createJWT', () => {
      interface NameClaim {
        name: string
      }
      interface StandardJWT {
        iss?: string | void
        sub?: string | void
        aud?: string | void
        exp?: number | void
        iat?: number | void
        claims?: NameClaim | void
      }
      function devoid(fake: StandardJWT) {
        const payload: StandardJWT = {}
        if (fake.iss) payload.iss = fake.iss
        if (fake.sub) payload.sub = fake.sub
        if (fake.aud) payload.aud = fake.aud
        if (fake.exp) payload.exp = fake.exp
        if (fake.iat) payload.iat = fake.iat
        if (fake.claims) payload.claims = fake.claims
        return payload
      }
      const validPayloads: Fuzzer<StandardJWT> = object<StandardJWT>({
        iss: string().maybe(),
        sub: string().maybe(),
        aud: string().maybe(),
        iat: posInteger().maybe(),
        exp: posInteger()
          .map(exp => exp + NOW + 1)
          .maybe(),
        claims: object<NameClaim>({
          name: asciiString()
        }).maybe()
      }).map(devoid)

      const expiredPayloads: Fuzzer<StandardJWT> = object<StandardJWT>({
        exp: posInteger({ maxSize: NOW - 1 })
      })

      check('generates valid JWT', [validPayloads], payload => {
        const jwt = id.createJWT(payload)
        expect(jwt).toBeDefined()
        const verified = verifyJWT(jwt)
        expect(verified.issuer).toEqual(id.did)
        expect(verified.payload).toEqual({ ...payload, iss: id.did, iat: NOW })
      })

      check('handles expiration', [expiredPayloads], payload => {
        const jwt = id.createJWT(payload)
        expect(jwt).toBeDefined()
        expect(() => verifyJWT(jwt)).toThrowError(
          `JWT expired on: ${payload.exp}`
        )
      })
    })
  })

  describe('encrypt()', () => {
    describe('with counterparty', () => {
      const alice = createIdentity()
      const clearText = 'Super Secret'
      let encrypted: Encrypted
      beforeAll(
        async () => (encrypted = await id.encrypt(alice.did, clearText))
      )

      it('should contain the to', () => {
        expect(encrypted.to).toEqual(alice.did)
      })

      it('should contain the from', () => {
        expect(encrypted.from).toEqual(id.did)
      })

      it('should contain a nonce', () => {
        expect(encrypted.nonce).toBeDefined()
        expect(naclutil.decodeBase64(encrypted.nonce)).toBeDefined()
      })

      it('should contain cipher text', () => {
        expect(encrypted.ciphertext).toBeDefined()
        expect(naclutil.decodeBase64(encrypted.ciphertext)).toBeDefined()
      })

      it('should contain a version', () => {
        expect(encrypted.version).toEqual('x25519-xsalsa20-poly1305')
      })

      describe('decrypt()', () => {
        describe('creator', () => {
          it('can decrypt', () => {
            expect(id.decrypt(encrypted)).toEqual(clearText)
          })
        })
        describe('recipient', () => {
          it('can decrypt', () => {
            expect(alice.decrypt(encrypted)).toEqual(clearText)
          })
        })
      })
    })

    describe('to myself', () => {
      const clearText = 'Super Secret'
      let encrypted: Encrypted
      beforeAll(async () => (encrypted = await id.encrypt(id.did, clearText)))

      it('should contain the to', () => {
        expect(encrypted.to).toEqual(id.did)
      })

      it('should contain a nonce', () => {
        expect(encrypted.nonce).toBeDefined()
        expect(naclutil.decodeBase64(encrypted.nonce)).toBeDefined()
      })

      it('should contain cipher text', () => {
        expect(encrypted.ciphertext).toBeDefined()
        expect(naclutil.decodeBase64(encrypted.ciphertext)).toBeDefined()
      })

      it('should contain a version', () => {
        expect(encrypted.version).toEqual('xsalsa20-poly1305')
      })

      describe('decrypt()', () => {
        describe('creator', () => {
          it('can decrypt', () => {
            expect(id.decrypt(encrypted)).toEqual(clearText)
          })
        })
      })
    })
  })

  describe('openSession', () => {
    describe('recipient has encryption PublicKey', () => {
      const alice = createIdentity()
      let session: EncryptedSession
      const alicePublicKey = naclutil.encodeBase64(alice.encPublicKey)

      beforeAll(async () => {
        session = await id.openSession(alice.did)
      })

      describe('meta data', () => {
        describe('to property', () => {
          it('should be set to recipients DID', () => {
            expect(session.to).toEqual(alice.did)
          })
        })
      })

      describe('encrypt', () => {
        check(
          'encrypts any string correctly',
          [clearTexts],
          async clearText => {
            const encrypted = await session.encrypt(clearText)
            expect(encrypted.from).toEqual(id.did)
            expect(encrypted.to).toEqual(alice.did)
            expect(encrypted.toPublicKey).toEqual(alicePublicKey)
            expect(encrypted.version).toEqual('x25519-xsalsa20-poly1305')
            expect(session.decrypt(encrypted)).toEqual(clearText)
            expect(id.decrypt(encrypted)).toEqual(clearText)
            expect(alice.decrypt(encrypted)).toEqual(clearText)
          }
        )
      })

      describe('Recipient is myself', () => {
        beforeAll(async () => {
          session = await id.openSession(id.did)
        })

        it('should set to', () => {
          expect(session.to).toEqual(id.did)
        })

        describe('encrypt', () => {
          check(
            'encrypts any string correctly',
            [clearTexts],
            async clearText => {
              const encrypted = await session.encrypt(clearText)
              expect(encrypted.from).toBeUndefined()
              expect(encrypted.toPublicKey).toBeUndefined()
              expect(encrypted.to).toEqual(id.did)
              expect(encrypted.version).toEqual('xsalsa20-poly1305')
              expect(session.decrypt(encrypted)).toEqual(clearText)
              expect(id.decrypt(encrypted)).toEqual(clearText)
            }
          )
        })
      })
    })
    describe('non nacl did', () => {
      describe('recipient does not have EncPublicKey', () => {
        const ethr = 'did:ethr:0x2Cc31912B2b0f3075A87b3640923D45A26cef3Ee'
        const fail = 'did:fail:hello'
        describe('default behavior', () => {
          it('should throw an exception', async () => {
            try {
              const session = await id.openSession(ethr)
              return expect(session).toBeUndefined()
            } catch (error) {
              return expect(error.message).toEqual(
                'Recipient DID did:ethr:0x2Cc31912B2b0f3075A87b3640923D45A26cef3Ee does not have a valid encryption publicKey'
              )
            }
          })

          describe('resolution failure', () => {
            it('should throw an exception', async () => {
              try {
                const session = await id.openSession(fail)
                return expect(session).toBeUndefined()
              } catch (error) {
                return expect(error.message).toEqual(
                  'Recipient DID did:fail:hello does not have a valid encryption publicKey'
                )
              }
            })
          })
        })
        describe('with override set to true', () => {
          describe('Setup Symetric session with myself', () => {
            let session: EncryptedSession
            beforeAll(async () => {
              session = await id.openSession(ethr, true)
            })

            it('should set to', () => {
              expect(session.to).toEqual(id.did)
            })

            describe('encrypt', () => {
              check(
                'encrypts any string correctly',
                [clearTexts],
                async clearText => {
                  const encrypted = await session.encrypt(clearText)
                  expect(encrypted.from).toBeUndefined()
                  expect(encrypted.toPublicKey).toBeUndefined()
                  expect(encrypted.to).toEqual(id.did)
                  expect(encrypted.version).toEqual('xsalsa20-poly1305')
                  expect(session.decrypt(encrypted)).toEqual(clearText)
                  expect(id.decrypt(encrypted)).toEqual(clearText)
                }
              )
            })
          })

          describe('resolving error', () => {
            let session: EncryptedSession
            beforeAll(async () => {
              session = await id.openSession(fail, true)
            })

            it('should set to', () => {
              expect(session.to).toEqual(id.did)
            })
          })
        })

        describe('with override set to a encPublicKey', () => {
          const encKP = nacl.box.keyPair()
          const encPublicKey = naclutil.encodeBase64(encKP.publicKey)
          let session: EncryptedSession
          beforeAll(async () => {
            session = await id.openSession(ethr, encPublicKey)
          })

          describe('encryption', () => {
            check(
              'encrypts any string correctly',
              [clearTexts],
              async clearText => {
                const encrypted = await session.encrypt(clearText)
                expect(
                  naclutil.encodeUTF8(<Uint8Array>(
                    nacl.box.open(
                      naclutil.decodeBase64(encrypted.ciphertext),
                      naclutil.decodeBase64(encrypted.nonce),
                      id.encPublicKey,
                      encKP.secretKey
                    )
                  ))
                ).toEqual(clearText)
                expect(encrypted.toPublicKey).toEqual(encPublicKey)
              }
            )
          })
        })
      })
    })
  })
})

describe('base64url', () => {
  describe('encodeBase64Url()', () => {
    it('encodes correctly', () => {
      expect(
        encodeBase64Url(
          naclutil.decodeBase64('Md8JiMIwsapml/FtQ2ngnGftNP5UmVCAUuhnLyAsPxI=')
        )
      ).toEqual('Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI')
    })
  })

  describe('decodeBase64Url()', () => {
    it('decodes correctly', () => {
      expect(
        naclutil.encodeBase64(
          decodeBase64Url('Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI')
        )
      ).toEqual('Md8JiMIwsapml/FtQ2ngnGftNP5UmVCAUuhnLyAsPxI=')
    })
  })

  describe('random test', () => {
    check(
      `should encode and decode correctly at different sizes`,
      [byteArrays],
      data => {
        const encoded = encodeBase64Url(data)
        expect(decodeBase64Url(encoded)).toEqual(data)
      }
    )
  })
})
