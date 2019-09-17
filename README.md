---
title: "NaCL DID Resolver and Manager"
index: 0
category: "nacl-did"
type: "reference"
source: "https://github.com/uport-project/nacl-did/blob/develop/README.md"
---

# NaCL DID Resolver and Manager

[![CircleCI](https://circleci.com/gh/uport-project/nacl-did.svg?style=svg)](https://circleci.com/gh/uport-project/nacl-did)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/8ce0d076d47147deb76bc7bb43df9216)](https://app.codacy.com/app/pelle/nacl-did?utm_source=github.com&utm_medium=referral&utm_content=uport-project/nacl-did&utm_campaign=Badge_Grade_Dashboard)

[FAQ and helpdesk support](http://bit.ly/uPort_helpdesk)

This library is intended to use cryptographic keys from [NaCL](http://nacl.cr.yp.to) cryptographic suite as [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/#decentralized-identifiers-dids) and generate an associated [DID Document](https://w3c-ccg.github.io/did-spec/#did-documents).

Motivation. There is a need for non updateable DID's for use in IOT and other applications, where lack of network, size of code base and other such concerns are paramount to adoption. These concerns need to be addressed while not lowering the overall security guarantees.

*WARNING* This should not be used for representing long term primary identities of end users. But should be seen as a useful building block for building Identity Applications together with other more complete DID methods.

What NaCL DID does:

* Provides a single `Ed25519` Signing Public Key for a DID
* Provide a single `Curve25519` Encryption Public Key for a DID
* Small DID size

What it can not do:

* It can NOT rotate keys
* It can NOT add keys
* It can NOT contain service end points

It supports the proposed [Decentralized Identifiers](https://w3c-ccg.github.io/did-spec/) spec from the [W3C Credentials Community Group](https://w3c-ccg.github.io).

It requires the `did-resolver` library, which is the primary interface for resolving DIDs.

## DID method

The base identifier is a Base64Url encoded Ed25519 public key.

To encode a DID for an HTTPS domain, simply prepend `did:nacl:` to the public key.

eg: `PfFss0oSFiwSdJuZXO6EfGK2T37Bz5gPy-Dy8Hv-Izg -> did:nacl:PfFss0oSFiwSdJuZXO6EfGK2T37Bz5gPy-Dy8Hv-Izg`

## DID Document

The DID resolver generates a DID Document on the fly by adding signing public key from the DID and adds it to the `publicKey` and `authentication` arrays.

In addition it converts the `Ed25519` Signing Public Key to a `Curve25519` encryption public key and adds it to the publicKey array.

A DID Document for the `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI` would look like this:

```javascript
{
  '@context': 'https://w3id.org/did/v1',
  id: 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI',
  publicKey: [{
    id: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key1`,
    type: 'ED25519SignatureVerification',
    owner: 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI',
    publicKeyBase64: 'Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI'
  },{
    id: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key2`,
    type: 'Curve25519EncryptionPublicKey',
    owner: 'did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI',
    publicKeyBase64: 'OAsnUyuUBISGsOherdxO6rgzUeGe9SnffDXQk6KpkAY'
  }],
  authentication: [{
       type: 'ED25519SigningAuthentication',
       publicKey: `did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI#key1`
  }]
}
```

## Creating an Identity

The resolver presents a `createIdentity()` function that returns a ES6 Promise returning a Identity object containing a keyPair and DID.

```javascript
import { createIdentity, loadIdentity } from 'nacl-did'

const identity = createIdentity()

// the identity can be serialized using toJSON()
localStorage.setItem('naclId', JSON.stringify(identity.toJSON()))

// this can be similarly loaded using loadIdentity

const identity = loadIdentity(JSON.parse(localStorage.getItem('naclId')))

```

## Signing Data

The `sign()` method can be used to sign raw data.

```javascript
import { createIdentity, verifySignature } from 'nacl-did'

const identity = createIdentity()

const message = 'Hello' // Use String, Uint8Array or Buffer

const signedData = identity.sign(message)

if (identity.verify(signedData)) {
  console.log('Success!')
}

if (verifySignature(signedData)) {
  console.log('Success!')
}

```

## Signing JWT

The `createJWT()` method can be used as a minimal JWT implementation.

```javascript
import { createIdentity, verifyJWT } from 'nacl-did'

const identity = createIdentity()

const vc = identity.createJWT({sub: 'did:https:uport.me', claim: { url: 'https://uport.me'}})

// verifyJWT can verify JWT's but only signed by an issuer with a nacl-did
const {payload, did } = await verifyJWT(vc)
```

The built in JWT implementation only signs and verifies JWT's using the NaCL DID method. We recommend using [DID-JWT](https://github.com/uport-project/did-jwt) for a more complete solution.

## Encryption

The NaCL DID method supports public key encryption using NaCL's `x25519-xsalsa20-poly1305` (`box`) algorithm. If the `to` field is my own DID it uses  NaCL's symmetric encryption `xsalsa20-poly1305` (`secret-box`) algorithm instead.

Use the `encrypt(to, data)` and `decrypt(encrypted)` methods.

```javascript
import { createIdentity } from 'nacl-did'

const identity = createIdentity()
const encrypted = await identity.encrypt('did:nacl:PfFss0oSFiwSdJuZXO6EfGK2T37Bz5gPy-Dy8Hv-Izg', 'hello'})
const clear = identity.decrypt(encrypted)

```

## Encryption Sessions

In many applications you will be encrypting data repeatedly to the same recipient. For these it is more eficient to open an Encryption Session.

Use the `openSession(toDid)` method.

```javascript
import { createIdentity } from 'nacl-did'

const identity = createIdentity()
const session = identity.openSession('did:nacl:PfFss0oSFiwSdJuZXO6EfGK2T37Bz5gPy-Dy8Hv-Izg')
const encrypted = await session.encrypt('hello')
const clear = session.decrypt(encrypted)
```

In cases that the counterparty identity (the recipient) does not have an encryption key in it's DID document you can pass in an optional encryption public key (base64url encoded) received through an external process, but it will also default to any public key in the DID document.

```javascript
import { createIdentity } from 'nacl-did'

const identity = createIdentity()
const session = identity.openSession('did:ethr:0x2Cc31912B2b0f3075A87b3640923D45A26cef3Ee', 'mJsioLTc7iyILsSUT8qmWyTnzytSKEmcg8bAeJ2R33U')
const encrypted = await session.encrypt('hello')
const clear = session.decrypt(encrypted)
```

In other cases you want to always encrypt data to yourself, even if the counterparty doesn't have a public key. Just pass in a `true` to the `openSession`.

```javascript
import { createIdentity } from 'nacl-did'

const identity = createIdentity()
const session = identity.openSession('did:ethr:0x2Cc31912B2b0f3075A87b3640923D45A26cef3Ee', true)
const encrypted = await session.encrypt('hello')
const clear = session.decrypt(encrypted)
```

## Resolving a DID document

The resolver presents a simple `resolver()` function that returns a ES6 Promise returning the DID document.

```javascript
import { Resolver } from 'did-resolver'
import { resolver as naclDidResolver } from 'nacl-did'

const didResolver = new Resolver({ nacl: naclDidResolver })
didResolver.resolve('did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI').then(doc => console.log)

// You can also use ES7 async/await syntax
const doc = await didResolver.resolve('did:nacl:Md8JiMIwsapml_FtQ2ngnGftNP5UmVCAUuhnLyAsPxI')
```
