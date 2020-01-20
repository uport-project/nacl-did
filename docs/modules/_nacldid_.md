**[nacl-did](../README.md)**

[Globals](../globals.md) › ["nacldid"](_nacldid_.md)

# External module: "nacldid"

## Index

### Classes

* [AsymEncryptedSession](../classes/_nacldid_.asymencryptedsession.md)
* [EncryptedSession](../classes/_nacldid_.encryptedsession.md)
* [NaCLIdentity](../classes/_nacldid_.naclidentity.md)
* [SymEncryptedSession](../classes/_nacldid_.symencryptedsession.md)

### Interfaces

* [Encrypted](../interfaces/_nacldid_.encrypted.md)
* [EncryptedTemplate](../interfaces/_nacldid_.encryptedtemplate.md)
* [JOSEHeader](../interfaces/_nacldid_.joseheader.md)
* [NaCLKeyPair](../interfaces/_nacldid_.naclkeypair.md)
* [RandomBytesSource](../interfaces/_nacldid_.randombytessource.md)
* [SerializableNaCLIdentity](../interfaces/_nacldid_.serializablenaclidentity.md)
* [SignedData](../interfaces/_nacldid_.signeddata.md)
* [VerifiedJWT](../interfaces/_nacldid_.verifiedjwt.md)

### Variables

* [ASYM_CIPHER_VERSION](_nacldid_.md#const-asym_cipher_version)
* [ENCODED_JOSE_HEADER](_nacldid_.md#const-encoded_jose_header)
* [SYM_CIPHER_VERSION](_nacldid_.md#const-sym_cipher_version)
* [randomBytes](_nacldid_.md#let-randombytes)

### Functions

* [createIdentity](_nacldid_.md#createidentity)
* [decodeBase64Url](_nacldid_.md#decodebase64url)
* [didToEncPubKey](_nacldid_.md#didtoencpubkey)
* [didToSignPubKey](_nacldid_.md#didtosignpubkey)
* [encodeBase64Url](_nacldid_.md#encodebase64url)
* [loadIdentity](_nacldid_.md#loadidentity)
* [naclRandomBytes](_nacldid_.md#naclrandombytes)
* [normalizeClearData](_nacldid_.md#normalizecleardata)
* [pad](_nacldid_.md#pad)
* [resolver](_nacldid_.md#resolver)
* [setRandomBytesSource](_nacldid_.md#setrandombytessource)
* [verifyJWT](_nacldid_.md#verifyjwt)
* [verifySignature](_nacldid_.md#verifysignature)

### Object literals

* [JOSE_HEADER](_nacldid_.md#const-jose_header)

## Variables

### `Const` ASYM_CIPHER_VERSION

• **ASYM_CIPHER_VERSION**: *"x25519-xsalsa20-poly1305"* = "x25519-xsalsa20-poly1305"

*Defined in [nacldid.ts:6](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L6)*

___

### `Const` ENCODED_JOSE_HEADER

• **ENCODED_JOSE_HEADER**: *string* =  encodeBase64Url(
  naclutil.decodeUTF8(JSON.stringify(JOSE_HEADER))
)

*Defined in [nacldid.ts:119](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L119)*

___

### `Const` SYM_CIPHER_VERSION

• **SYM_CIPHER_VERSION**: *"xsalsa20-poly1305"* = "xsalsa20-poly1305"

*Defined in [nacldid.ts:7](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L7)*

___

### `Let` randomBytes

• **randomBytes**: *[RandomBytesSource](../interfaces/_nacldid_.randombytessource.md)* =  naclRandomBytes

*Defined in [nacldid.ts:60](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L60)*

## Functions

###  createIdentity

▸ **createIdentity**(`didResolver?`: Resolver): *[NaCLIdentity](../classes/_nacldid_.naclidentity.md)*

*Defined in [nacldid.ts:477](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L477)*

Create a new NaCLIDentity

**Parameters:**

Name | Type |
------ | ------ |
`didResolver?` | Resolver |

**Returns:** *[NaCLIdentity](../classes/_nacldid_.naclidentity.md)*

___

###  decodeBase64Url

▸ **decodeBase64Url**(`base64url`: string): *Uint8Array*

*Defined in [nacldid.ts:110](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L110)*

Decodes a base64url encoded string into a Uint8Array (byte array)

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`base64url` | string | base64url encoded string  |

**Returns:** *Uint8Array*

___

###  didToEncPubKey

▸ **didToEncPubKey**(`did`: string): *Uint8Array*

*Defined in [nacldid.ts:469](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L469)*

**Parameters:**

Name | Type |
------ | ------ |
`did` | string |

**Returns:** *Uint8Array*

___

###  didToSignPubKey

▸ **didToSignPubKey**(`did`: string): *Uint8Array*

*Defined in [nacldid.ts:464](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L464)*

**Parameters:**

Name | Type |
------ | ------ |
`did` | string |

**Returns:** *Uint8Array*

___

###  encodeBase64Url

▸ **encodeBase64Url**(`data`: Uint8Array): *string*

*Defined in [nacldid.ts:85](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L85)*

Encode a byte array into a base64 url encoded string

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | Uint8Array | data to encode  |

**Returns:** *string*

___

###  loadIdentity

▸ **loadIdentity**(`sId`: [SerializableNaCLIdentity](../interfaces/_nacldid_.serializablenaclidentity.md), `didResolver?`: Resolver): *[NaCLIdentity](../classes/_nacldid_.naclidentity.md)*

*Defined in [nacldid.ts:485](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L485)*

Instantiates a Serialized NaCLIDentity

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sId` | [SerializableNaCLIdentity](../interfaces/_nacldid_.serializablenaclidentity.md) |   |
`didResolver?` | Resolver | - |

**Returns:** *[NaCLIdentity](../classes/_nacldid_.naclidentity.md)*

___

###  naclRandomBytes

▸ **naclRandomBytes**(`length`: number): *Promise‹Uint8Array›*

*Defined in [nacldid.ts:56](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L56)*

**Parameters:**

Name | Type |
------ | ------ |
`length` | number |

**Returns:** *Promise‹Uint8Array›*

___

###  normalizeClearData

▸ **normalizeClearData**(`data`: string | Uint8Array): *Uint8Array*

*Defined in [nacldid.ts:73](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L73)*

Takes data which could be a string or a Uint8Array and normalizes it into a Uint8Array

**Parameters:**

Name | Type |
------ | ------ |
`data` | string \| Uint8Array |

**Returns:** *Uint8Array*

___

###  pad

▸ **pad**(`base64url`: string): *string*

*Defined in [nacldid.ts:93](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`base64url` | string |

**Returns:** *string*

___

###  resolver

▸ **resolver**(`did`: string, `parsed`: ParsedDID): *Promise‹DIDDocument | null›*

*Defined in [nacldid.ts:501](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L501)*

Registers `nacl` DID resolver

**Parameters:**

Name | Type |
------ | ------ |
`did` | string |
`parsed` | ParsedDID |

**Returns:** *Promise‹DIDDocument | null›*

___

###  setRandomBytesSource

▸ **setRandomBytesSource**(`source`: [RandomBytesSource](../interfaces/_nacldid_.randombytessource.md)): *void*

*Defined in [nacldid.ts:66](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L66)*

Sets a system wide random byte source

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`source` | [RandomBytesSource](../interfaces/_nacldid_.randombytessource.md) | an async function generating random bytes  |

**Returns:** *void*

___

###  verifyJWT

▸ **verifyJWT**(`jwt`: string): *[VerifiedJWT](../interfaces/_nacldid_.verifiedjwt.md)*

*Defined in [nacldid.ts:436](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L436)*

Verify JWT of type `{ typ: 'JWT', alg: 'Ed25519' }`

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`jwt` | string |   |

**Returns:** *[VerifiedJWT](../interfaces/_nacldid_.verifiedjwt.md)*

___

###  verifySignature

▸ **verifySignature**(`signed`: [SignedData](../interfaces/_nacldid_.signeddata.md)): *boolean*

*Defined in [nacldid.ts:423](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L423)*

Verify Signature of Signed Data

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`signed` | [SignedData](../interfaces/_nacldid_.signeddata.md) |   |

**Returns:** *boolean*

## Object literals

### `Const` JOSE_HEADER

### ▪ **JOSE_HEADER**: *object*

*Defined in [nacldid.ts:118](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L118)*

###  alg

• **alg**: *string* = "Ed25519"

*Defined in [nacldid.ts:118](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L118)*

###  typ

• **typ**: *string* = "JWT"

*Defined in [nacldid.ts:118](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L118)*