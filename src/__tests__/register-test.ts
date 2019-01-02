import register, { createIdentity, loadIdentity, verifySignature, verifyJWT, encodeBase64Url, decodeBase64Url, didToEncPubKey, EncryptedSession, Encrypted } from '../register'
import registerEthrDid from 'ethr-did-resolver'
import resolve from 'did-resolver'
import naclutil from 'tweetnacl-util'
import nacl from 'tweetnacl'

import MockDate from 'mockdate'

const NOW = 1485321133
MockDate.set(NOW * 1000)
register()

describe('nacl did resolver', () => {
  const did: string = 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI'
  const validDidDoc = {
    '@context': 'https://w3id.org/did/v1',
    id: did,
    publicKey: [{
      id: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key1`,
      type: 'ED25519SignatureVerification',
      owner: did,
      publicKeyBase64: 'Md8JiMIwsapml/FtQ2ngnGftNP5UmVCAUuhnLyAsPxI='
    }, {
      id: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key2`,
      type: 'Curve25519EncryptionPublicKey',
      owner: did,
      publicKeyBase64: 'OAsnUyuUBISGsOherdxO6rgzUeGe9SnffDXQk6KpkAY='
    }],
    authentication: [{
      type: 'ED25519SigningAuthentication',
      publicKey: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key1`
    }]
  }

  it('resolves document', () => {
    return expect(resolve(did)).resolves.toEqual(validDidDoc)
  })
})

describe('createIdentity()', () => {
  const id = createIdentity()

  it('should have a did', () => {
    expect(id.did).toMatch(/^did:nacl:[a-zA-Z0-9-_]+$/)
  })

  describe('serialization', () => {
    const serialized = id.toJSON()
    it('should be serializable', () => {
      expect(id.toJSON()).toEqual(serialized)
    })

    it('should be loadable', () => {
      expect(loadIdentity(serialized)).toEqual(id)
    })
  })

  describe('sign()', () => {
    ['hello', naclutil.decodeUTF8('This is a Uint8Array')].forEach(clear => {
      describe('signed', () => {
        const signed = id.sign(clear)
        it('should contain data', () => {
          expect(signed.data).toEqual(clear)
        })

        describe('verify()', () => {
          it('should be able to verify signature', () => {
            expect(id.verify(signed)).toBeTruthy()
          })

          it('should fail incorrect signature', () => {
            const other = id.sign('something completely different')
            expect(id.verify({ ...signed, signature: other.signature })).toBeFalsy()
          })
        })

        describe('verifySignature()', () => {
          it('should verify that it came from given did', () => {
            expect(verifySignature(signed)).toBeTruthy()
          })

          it('should fail that it came from other did', () => {
            const malory = createIdentity()
            expect(verifySignature({ ...signed, signer: malory.did })).toBeFalsy()
          })
        })
      })
    })
  })

  describe('JWT', () => {
    describe('createJWT', () => {
      it('generates JWT', () => {
        const payload = { sub: id.did, claims: { name: 'Bill' } }
        const jwt = id.createJWT(payload)
        expect(jwt).toBeDefined()
        const verified = verifyJWT(jwt)
        expect(verified.issuer).toEqual(id.did)
        expect(verified.payload).toEqual({ ...payload, iss: id.did, iat: NOW })
      })
    })
  })

  describe('encrypt()', () => {
    const alice = createIdentity()
    const clearText = 'Super Secret'
    const encrypted = id.encrypt(alice.did, clearText)

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
          expect(naclutil.encodeUTF8(<Uint8Array>id.decrypt(encrypted))).toEqual(clearText)
        })
      })
      describe('recipient', () => {
        it('can decrypt', () => {
          expect(naclutil.encodeUTF8(<Uint8Array>alice.decrypt(encrypted))).toEqual(clearText)
        })
      })
    })
  })

  describe('openSession', () => {
    describe('recipient has encryption PublicKey', () => {
      const alice = createIdentity()
      let session: EncryptedSession

      beforeAll(async () => {
        session = await id.openSession(alice.did)
      })

      describe('meta data', () => {
        describe('from property', () => {
          it('should be set to my DID', () => {
            expect(session.from).toEqual(id.did)
          })
        })

        describe('to property', () => {
          it('should be set to recipients DID', () => {
            expect(session.to).toEqual(alice.did)
          })
        })
      })

      describe('encrypt', () => {
        const clearText = 'Secret Stuff'
        let encrypted: Encrypted
        beforeAll(() => {
          encrypted = session.encrypt(clearText)
        })

        describe('meta data', () => {
          describe('from property', () => {
            it('should be set to my DID', () => {
              expect(encrypted.from).toEqual(id.did)
            })
          })

          describe('to property', () => {
            it('should be set to recipients DID', () => {
              expect(encrypted.to).toEqual(alice.did)
            })
          })

          describe('toPublicKey', () => {
            it('should set toPublicKey', () => {
              expect(encrypted.toPublicKey).toEqual(naclutil.encodeBase64(didToEncPubKey(alice.did)))
            })
          })

          it('should contain a version', () => {
            expect(encrypted.version).toEqual('x25519-xsalsa20-poly1305')
          })
        })

        describe('decrypt', () => {
          describe('using session', () => {
            it('should decrypt', () => {
              expect(naclutil.encodeUTF8(<Uint8Array>session.decrypt(encrypted))).toEqual(clearText)
            })
          })

          describe('using sender identity', () => {
            it('should decrypt', () => {
              expect(naclutil.encodeUTF8(<Uint8Array>id.decrypt(encrypted))).toEqual(clearText)
            })
          })

          describe('using recipient identity', () => {
            it('should decrypt', () => {
              expect(naclutil.encodeUTF8(<Uint8Array>alice.decrypt(encrypted))).toEqual(clearText)
            })
          })
        })
      })

      describe('isOpen()', () => {
        it('should be open', () => {
          expect(session.isOpen()).toBeTruthy()
        })
      })

      describe('close()', () => {
        beforeAll(() => session.close())

        it('should not be open', () => {
          expect(session.isOpen()).toBeFalsy()
        })

        describe('encrypt', () => {
          it('should thrown an error', () => {
            expect(() => session.encrypt('hello')).toThrowError(`Session with ${alice.did} has been closed`)
          })
        })

        describe('decrypt', () => {
          it('should thrown an error', () => {
            const encrypted = id.encrypt(alice.did, 'hello')
            expect(() => session.decrypt(encrypted)).toThrowError(`Session with ${alice.did} has been closed`)
          })
        })
      })
    })
    describe('non nacl did', () => {
      describe('recipient does not have EncPublicKey', () => {
        const ethr = 'did:ethr:0x2Cc31912B2b0f3075A87b3640923D45A26cef3Ee'
        beforeAll(registerEthrDid)

        describe('with override set to true', () => {
          it('should generate an ephemeral public key', () => {
            return expect(id.openSession(ethr, true)).resolves.toBeDefined()
          })
        })

        describe('default behavior', () => {
          it('should throw an exception', async () => {
            try {
              const session = await id.openSession(ethr)
              return expect(session).toBeUndefined()
            } catch (error) {
              return expect(error.message).toEqual('Recipient DID did:ethr:0x2Cc31912B2b0f3075A87b3640923D45A26cef3Ee does not have a valid encryption publicKey')
            }
          })
        })
      })
    })
  })
})

describe('base64url', () => {
  describe('encodeBase64Url()', () => {
    it('encodes correctly', () => {
      expect(encodeBase64Url(naclutil.decodeBase64('Md8JiMIwsapml/FtQ2ngnGftNP5UmVCAUuhnLyAsPxI='))).toEqual('Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI')
    })
  })

  describe('decodeBase64Url()', () => {
    it('decodes correctly', () => {
      expect(naclutil.encodeBase64(decodeBase64Url('Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI'))).toEqual('Md8JiMIwsapml/FtQ2ngnGftNP5UmVCAUuhnLyAsPxI=')
    })
  })

  describe('random test', () => {
    for (let i = 0; i < 100; i++) {
      it(`should encode and decode correctly at size ${i}`, () => {
        const data = nacl.randomBytes(i)
        const encoded = encodeBase64Url(data)
        expect(decodeBase64Url(encoded)).toEqual(data)
      })
    }
  })
})