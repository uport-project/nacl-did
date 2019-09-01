**[nacl-did](../README.md)**

[Globals](../globals.md) › ["register"](../modules/_register_.md) › [NaCLIdentity](_register_.naclidentity.md)

# Class: NaCLIdentity

Encapsulates the functionality of an identity using the `nacl-did` method

## Hierarchy

* **NaCLIdentity**

## Index

### Constructors

* [constructor](_register_.naclidentity.md#constructor)

### Properties

* [did](_register_.naclidentity.md#did)
* [encPrivateKey](_register_.naclidentity.md#private-encprivatekey)
* [encPublicKey](_register_.naclidentity.md#encpublickey)
* [privateKey](_register_.naclidentity.md#private-privatekey)
* [publicKey](_register_.naclidentity.md#publickey)
* [resolver](_register_.naclidentity.md#private-resolver)

### Methods

* [createJWT](_register_.naclidentity.md#createjwt)
* [decrypt](_register_.naclidentity.md#decrypt)
* [encrypt](_register_.naclidentity.md#encrypt)
* [openSession](_register_.naclidentity.md#opensession)
* [resolveEncryptionPublicKey](_register_.naclidentity.md#resolveencryptionpublickey)
* [sign](_register_.naclidentity.md#sign)
* [toJSON](_register_.naclidentity.md#tojson)
* [verify](_register_.naclidentity.md#verify)

## Constructors

###  constructor

\+ **new NaCLIdentity**(`kp`: [NaCLKeyPair](../interfaces/_register_.naclkeypair.md), `didResolver?`: Resolver): *[NaCLIdentity](_register_.naclidentity.md)*

*Defined in [register.ts:119](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L119)*

Create a new NaCL Identity for a KeyPair

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`kp` | [NaCLKeyPair](../interfaces/_register_.naclkeypair.md) | a KeyPair generated prior from nacl.box.keyPair()  |
`didResolver?` | Resolver | - |

**Returns:** *[NaCLIdentity](_register_.naclidentity.md)*

## Properties

###  did

• **did**: *string*

*Defined in [register.ts:114](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L114)*

___

### `Private` encPrivateKey

• **encPrivateKey**: *Uint8Array*

*Defined in [register.ts:118](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L118)*

___

###  encPublicKey

• **encPublicKey**: *Uint8Array*

*Defined in [register.ts:116](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L116)*

___

### `Private` privateKey

• **privateKey**: *Uint8Array*

*Defined in [register.ts:117](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L117)*

___

###  publicKey

• **publicKey**: *Uint8Array*

*Defined in [register.ts:115](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L115)*

___

### `Private` resolver

• **resolver**: *Resolver*

*Defined in [register.ts:119](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L119)*

## Methods

###  createJWT

▸ **createJWT**(`payload`: Object): *string*

*Defined in [register.ts:166](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L166)*

Creates a signed JWT using the following header `{ typ: 'JWT', alg: 'Ed25519' }`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`payload` | Object | Any valid JSON encodeable JS object  |

**Returns:** *string*

___

###  decrypt

▸ **decrypt**(`__namedParameters`: object): *string*

*Defined in [register.ts:244](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L244)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`ciphertext` | string |
`from` | undefined \| string |
`nonce` | string |
`to` | string |
`version` | string |

**Returns:** *string*

___

###  encrypt

▸ **encrypt**(`to`: string, `data`: string | Uint8Array): *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*

*Defined in [register.ts:218](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L218)*

Encrypt a single message to send to a recipient

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`to` | string | DID of recipient (uses symetric encryption if to is my own DID) |
`data` | string \| Uint8Array | Data to encrypt  |

**Returns:** *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*

___

###  openSession

▸ **openSession**(`to`: string, `overridePublicKey`: boolean | string): *Promise‹[EncryptedSession](_register_.encryptedsession.md)›*

*Defined in [register.ts:198](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L198)*

Opens an efficient session for encrypting and decrypting messages between this and another DID.

An optional publicKey that has been exchanged out of band can be passed into the second parameter. This
will ONLY be used if no encryption public key was found in DID document.

If you would like to encrypt things to your self regardless if a public key was not found, pass in the value of `true` as the second argument.
It will then be encrypted symetrically instead.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`to` | string | - | DID of recipient |
`overridePublicKey` | boolean \| string | false | If DID method does not contain an encryption public key use this key   |

**Returns:** *Promise‹[EncryptedSession](_register_.encryptedsession.md)›*

___

###  resolveEncryptionPublicKey

▸ **resolveEncryptionPublicKey**(`did`: string): *Promise‹Uint8Array | undefined›*

*Defined in [register.ts:173](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`did` | string |

**Returns:** *Promise‹Uint8Array | undefined›*

___

###  sign

▸ **sign**(`data`: string | Uint8Array): *[SignedData](../interfaces/_register_.signeddata.md)*

*Defined in [register.ts:146](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L146)*

Signs data and returns the data, did and signature

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | string \| Uint8Array |   |

**Returns:** *[SignedData](../interfaces/_register_.signeddata.md)*

___

###  toJSON

▸ **toJSON**(): *[SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md)*

*Defined in [register.ts:138](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L138)*

Serializes NaclDID to just it's base64 encoded private key and DID

**Returns:** *[SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md)*

___

###  verify

▸ **verify**(`signed`: [SignedData](../interfaces/_register_.signeddata.md)): *boolean*

*Defined in [register.ts:158](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L158)*

Verifies that Signed Data was signed by this identity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`signed` | [SignedData](../interfaces/_register_.signeddata.md) |   |

**Returns:** *boolean*