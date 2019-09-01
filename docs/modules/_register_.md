**[nacl-did](../README.md)**

[Globals](../globals.md) › ["register"](_register_.md)

# External module: "register"

## Index

### Classes

* [AsymEncryptedSession](../classes/_register_.asymencryptedsession.md)
* [EncryptedSession](../classes/_register_.encryptedsession.md)
* [NaCLIdentity](../classes/_register_.naclidentity.md)
* [SymEncryptedSession](../classes/_register_.symencryptedsession.md)

### Interfaces

* [Encrypted](../interfaces/_register_.encrypted.md)
* [EncryptedTemplate](../interfaces/_register_.encryptedtemplate.md)
* [JOSEHeader](../interfaces/_register_.joseheader.md)
* [NaCLKeyPair](../interfaces/_register_.naclkeypair.md)
* [RandomBytesSource](../interfaces/_register_.randombytessource.md)
* [SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md)
* [SignedData](../interfaces/_register_.signeddata.md)
* [VerifiedJWT](../interfaces/_register_.verifiedjwt.md)

### Variables

* [ASYM_CIPHER_VERSION](_register_.md#const-asym_cipher_version)
* [ENCODED_JOSE_HEADER](_register_.md#const-encoded_jose_header)
* [SYM_CIPHER_VERSION](_register_.md#const-sym_cipher_version)
* [randomBytes](_register_.md#let-randombytes)

### Functions

* [createIdentity](_register_.md#createidentity)
* [decodeBase64Url](_register_.md#decodebase64url)
* [didToEncPubKey](_register_.md#didtoencpubkey)
* [didToSignPubKey](_register_.md#didtosignpubkey)
* [encodeBase64Url](_register_.md#encodebase64url)
* [loadIdentity](_register_.md#loadidentity)
* [naclRandomBytes](_register_.md#naclrandombytes)
* [normalizeClearData](_register_.md#normalizecleardata)
* [pad](_register_.md#pad)
* [resolver](_register_.md#resolver)
* [setRandomBytesSource](_register_.md#setrandombytessource)
* [verifyJWT](_register_.md#verifyjwt)
* [verifySignature](_register_.md#verifysignature)

### Object literals

* [JOSE_HEADER](_register_.md#const-jose_header)

## Variables

### `Const` ASYM_CIPHER_VERSION

• **ASYM_CIPHER_VERSION**: *"x25519-xsalsa20-poly1305"* = "x25519-xsalsa20-poly1305"

*Defined in [register.ts:6](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L6)*

___

### `Const` ENCODED_JOSE_HEADER

• **ENCODED_JOSE_HEADER**: *string* =  encodeBase64Url(naclutil.decodeUTF8(JSON.stringify(JOSE_HEADER)))

*Defined in [register.ts:108](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L108)*

___

### `Const` SYM_CIPHER_VERSION

• **SYM_CIPHER_VERSION**: *"xsalsa20-poly1305"* = "xsalsa20-poly1305"

*Defined in [register.ts:7](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L7)*

___

### `Let` randomBytes

• **randomBytes**: *[RandomBytesSource](../interfaces/_register_.randombytessource.md)* =  naclRandomBytes

*Defined in [register.ts:60](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L60)*

## Functions

###  createIdentity

▸ **createIdentity**(`didResolver?`: Resolver): *[NaCLIdentity](../classes/_register_.naclidentity.md)*

*Defined in [register.ts:379](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L379)*

Create a new NaCLIDentity

**Parameters:**

Name | Type |
------ | ------ |
`didResolver?` | Resolver |

**Returns:** *[NaCLIdentity](../classes/_register_.naclidentity.md)*

___

###  decodeBase64Url

▸ **decodeBase64Url**(`base64url`: string): *Uint8Array*

*Defined in [register.ts:103](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L103)*

Decodes a base64url encoded string into a Uint8Array (byte array)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`base64url` | string | base64url encoded string  |

**Returns:** *Uint8Array*

___

###  didToEncPubKey

▸ **didToEncPubKey**(`did`: string): *Uint8Array*

*Defined in [register.ts:371](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L371)*

**Parameters:**

Name | Type |
------ | ------ |
`did` | string |

**Returns:** *Uint8Array*

___

###  didToSignPubKey

▸ **didToSignPubKey**(`did`: string): *Uint8Array*

*Defined in [register.ts:366](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L366)*

**Parameters:**

Name | Type |
------ | ------ |
`did` | string |

**Returns:** *Uint8Array*

___

###  encodeBase64Url

▸ **encodeBase64Url**(`data`: Uint8Array): *string*

*Defined in [register.ts:85](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L85)*

Encode a byte array into a base64 url encoded string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | data to encode  |

**Returns:** *string*

___

###  loadIdentity

▸ **loadIdentity**(`sId`: [SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md), `didResolver?`: Resolver): *[NaCLIdentity](../classes/_register_.naclidentity.md)*

*Defined in [register.ts:387](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L387)*

Instantiates a Serialized NaCLIDentity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sId` | [SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md) |   |
`didResolver?` | Resolver | - |

**Returns:** *[NaCLIdentity](../classes/_register_.naclidentity.md)*

___

###  naclRandomBytes

▸ **naclRandomBytes**(`length`: number): *Promise‹Uint8Array›*

*Defined in [register.ts:56](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *Promise‹Uint8Array›*

___

###  normalizeClearData

▸ **normalizeClearData**(`data`: string | Uint8Array): *Uint8Array*

*Defined in [register.ts:73](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L73)*

Takes data which could be a string or a Uint8Array and normalizes it into a Uint8Array

**Parameters:**

Name | Type |
------ | ------ |
`data` | string \| Uint8Array |

**Returns:** *Uint8Array*

___

###  pad

▸ **pad**(`base64url`: string): *string*

*Defined in [register.ts:89](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L89)*

**Parameters:**

Name | Type |
------ | ------ |
`base64url` | string |

**Returns:** *string*

___

###  resolver

▸ **resolver**(`did`: string, `parsed`: ParsedDID): *Promise‹DIDDocument | null›*

*Defined in [register.ts:396](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L396)*

Registers `nacl` DID resolver

**Parameters:**

Name | Type |
------ | ------ |
`did` | string |
`parsed` | ParsedDID |

**Returns:** *Promise‹DIDDocument | null›*

___

###  setRandomBytesSource

▸ **setRandomBytesSource**(`source`: [RandomBytesSource](../interfaces/_register_.randombytessource.md)): *void*

*Defined in [register.ts:66](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L66)*

Sets a system wide random byte source

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`source` | [RandomBytesSource](../interfaces/_register_.randombytessource.md) | an async function generating random bytes  |

**Returns:** *void*

___

###  verifyJWT

▸ **verifyJWT**(`jwt`: string): *[VerifiedJWT](../interfaces/_register_.verifiedjwt.md)*

*Defined in [register.ts:347](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L347)*

Verify JWT of type `{ typ: 'JWT', alg: 'Ed25519' }`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jwt` | string |   |

**Returns:** *[VerifiedJWT](../interfaces/_register_.verifiedjwt.md)*

___

###  verifySignature

▸ **verifySignature**(`signed`: [SignedData](../interfaces/_register_.signeddata.md)): *boolean*

*Defined in [register.ts:338](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L338)*

Verify Signature of Signed Data

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`signed` | [SignedData](../interfaces/_register_.signeddata.md) |   |

**Returns:** *boolean*

## Object literals

### `Const` JOSE_HEADER

### ▪ **JOSE_HEADER**: *object*

*Defined in [register.ts:107](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L107)*

###  alg

• **alg**: *string* = "Ed25519"

*Defined in [register.ts:107](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L107)*

###  typ

• **typ**: *string* = "JWT"

*Defined in [register.ts:107](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L107)*