[nacl-did](../README.md) > ["register"](../modules/_register_.md)

# External module: "register"

## Index

### Classes

* [EncryptedSession](../classes/_register_.encryptedsession.md)
* [NaCLIdentity](../classes/_register_.naclidentity.md)

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

* [CIPHER_VERSION](_register_.md#cipher_version)
* [ENCODED_JOSE_HEADER](_register_.md#encoded_jose_header)
* [randomBytes](_register_.md#randombytes)

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
* [register](_register_.md#register)
* [resolveEncryptionPublicKey](_register_.md#resolveencryptionpublickey)
* [setRandomBytesSource](_register_.md#setrandombytessource)
* [verifyJWT](_register_.md#verifyjwt)
* [verifySignature](_register_.md#verifysignature)

### Object literals

* [JOSE_HEADER](_register_.md#jose_header)

---

## Variables

<a id="cipher_version"></a>

### `<Const>` CIPHER_VERSION

**● CIPHER_VERSION**: *"x25519-xsalsa20-poly1305"* = "x25519-xsalsa20-poly1305"

*Defined in [register.ts:6](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L6)*

___
<a id="encoded_jose_header"></a>

### `<Const>` ENCODED_JOSE_HEADER

**● ENCODED_JOSE_HEADER**: *`string`* =  encodeBase64Url(naclutil.decodeUTF8(JSON.stringify(JOSE_HEADER)))

*Defined in [register.ts:107](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L107)*

___
<a id="randombytes"></a>

### `<Let>` randomBytes

**● randomBytes**: *[RandomBytesSource](../interfaces/_register_.randombytessource.md)* =  naclRandomBytes

*Defined in [register.ts:59](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L59)*

___

## Functions

<a id="createidentity"></a>

###  createIdentity

▸ **createIdentity**(): [NaCLIdentity](../classes/_register_.naclidentity.md)

*Defined in [register.ts:323](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L323)*

Create a new NaCLIDentity

**Returns:** [NaCLIdentity](../classes/_register_.naclidentity.md)

___
<a id="decodebase64url"></a>

###  decodeBase64Url

▸ **decodeBase64Url**(base64url: *`string`*): `Uint8Array`

*Defined in [register.ts:102](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L102)*

Decodes a base64url encoded string into a Uint8Array (byte array)

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| base64url | `string` |  base64url encoded string |

**Returns:** `Uint8Array`

___
<a id="didtoencpubkey"></a>

###  didToEncPubKey

▸ **didToEncPubKey**(did: *`string`*): `Uint8Array`

*Defined in [register.ts:315](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L315)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| did | `string` |

**Returns:** `Uint8Array`

___
<a id="didtosignpubkey"></a>

###  didToSignPubKey

▸ **didToSignPubKey**(did: *`string`*): `Uint8Array`

*Defined in [register.ts:302](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L302)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| did | `string` |

**Returns:** `Uint8Array`

___
<a id="encodebase64url"></a>

###  encodeBase64Url

▸ **encodeBase64Url**(data: *`Uint8Array`*): `string`

*Defined in [register.ts:84](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L84)*

Encode a byte array into a base64 url encoded string

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `Uint8Array` |  data to encode |

**Returns:** `string`

___
<a id="loadidentity"></a>

###  loadIdentity

▸ **loadIdentity**(sId: *[SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md)*): [NaCLIdentity](../classes/_register_.naclidentity.md)

*Defined in [register.ts:331](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L331)*

Instantiates a Serialized NaCLIDentity

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| sId | [SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md) |   |

**Returns:** [NaCLIdentity](../classes/_register_.naclidentity.md)

___
<a id="naclrandombytes"></a>

###  naclRandomBytes

▸ **naclRandomBytes**(length: *`number`*): `Promise`<`Uint8Array`>

*Defined in [register.ts:55](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L55)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| length | `number` |

**Returns:** `Promise`<`Uint8Array`>

___
<a id="normalizecleardata"></a>

###  normalizeClearData

▸ **normalizeClearData**(data: *`string` | `Uint8Array`*): `Uint8Array`

*Defined in [register.ts:72](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L72)*

Takes data which could be a string or a Uint8Array and normalizes it into a Uint8Array

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `string` | `Uint8Array` |

**Returns:** `Uint8Array`

___
<a id="pad"></a>

###  pad

▸ **pad**(base64url: *`string`*): `string`

*Defined in [register.ts:88](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L88)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| base64url | `string` |

**Returns:** `string`

___
<a id="register"></a>

###  register

▸ **register**(): `void`

*Defined in [register.ts:340](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L340)*

Registers `nacl` DID resolver

**Returns:** `void`

___
<a id="resolveencryptionpublickey"></a>

###  resolveEncryptionPublicKey

▸ **resolveEncryptionPublicKey**(did: *`string`*): `Promise`<`Uint8Array` | `undefined`>

*Defined in [register.ts:307](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L307)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| did | `string` |

**Returns:** `Promise`<`Uint8Array` | `undefined`>

___
<a id="setrandombytessource"></a>

###  setRandomBytesSource

▸ **setRandomBytesSource**(source: *[RandomBytesSource](../interfaces/_register_.randombytessource.md)*): `void`

*Defined in [register.ts:65](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L65)*

Sets a system wide random byte source

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| source | [RandomBytesSource](../interfaces/_register_.randombytessource.md) |  an async function generating random bytes |

**Returns:** `void`

___
<a id="verifyjwt"></a>

###  verifyJWT

▸ **verifyJWT**(jwt: *`string`*): [VerifiedJWT](../interfaces/_register_.verifiedjwt.md)

*Defined in [register.ts:290](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L290)*

Verify JWT of type `{ typ: 'JWT', alg: 'Ed25519' }`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| jwt | `string` |   |

**Returns:** [VerifiedJWT](../interfaces/_register_.verifiedjwt.md)

___
<a id="verifysignature"></a>

###  verifySignature

▸ **verifySignature**(signed: *[SignedData](../interfaces/_register_.signeddata.md)*): `boolean`

*Defined in [register.ts:281](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L281)*

Verify Signature of Signed Data

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| signed | [SignedData](../interfaces/_register_.signeddata.md) |   |

**Returns:** `boolean`

___

## Object literals

<a id="jose_header"></a>

### `<Const>` JOSE_HEADER

**JOSE_HEADER**: *`object`*

*Defined in [register.ts:106](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L106)*

<a id="jose_header.alg"></a>

####  alg

**● alg**: *`string`* = "Ed25519"

*Defined in [register.ts:106](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L106)*

___
<a id="jose_header.typ"></a>

####  typ

**● typ**: *`string`* = "JWT"

*Defined in [register.ts:106](https://github.com/uport-project/nacl-did/blob/83e7acd/src/register.ts#L106)*

___

___

