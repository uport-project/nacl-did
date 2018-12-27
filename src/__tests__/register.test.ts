import resolve from 'did-resolver'
import register, { createIdentity, loadIdentity, verifySignature, encodeBase64Url, decodeBase64Url } from '../register'
import naclutil from 'tweetnacl-util'
import nacl from 'tweetnacl'

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

  beforeAll(() => register())

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

  describe('encrypt()', () => {
    const alice = createIdentity()
    const clearText = 'Super Secret'
    const encrypted = id.encrypt(alice.did, clearText)

    it('should contain the parties', () => {
      expect(encrypted.parties).toEqual([id.did, alice.did])
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