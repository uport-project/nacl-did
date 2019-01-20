[nacl-did](../README.md) > ["register"](../modules/_register_.md)

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

* [ASYM_CIPHER_VERSION](_register_.md#asym_cipher_version)
* [ENCODED_JOSE_HEADER](_register_.md#encoded_jose_header)
* [SYM_CIPHER_VERSION](_register_.md#sym_cipher_version)
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
* [registerNaclDID](_register_.md#registernacldid)
* [resolveEncryptionPublicKey](_register_.md#resolveencryptionpublickey)
* [setRandomBytesSource](_register_.md#setrandombytessource)
* [verifyJWT](_register_.md#verifyjwt)
* [verifySignature](_register_.md#verifysignature)

### Object literals

* [JOSE_HEADER](_register_.md#jose_header)

---

## Variables

<a id="asym_cipher_version"></a>

### `<Const>` ASYM_CIPHER_VERSION

**● ASYM_CIPHER_VERSION**: *"x25519-xsalsa20-poly1305"* = "x25519-xsalsa20-poly1305"

*Defined in [register.ts:6](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L6)*

___
<a id="encoded_jose_header"></a>

### `<Const>` ENCODED_JOSE_HEADER

**● ENCODED_JOSE_HEADER**: *`string`* =  encodeBase64Url(naclutil.decodeUTF8(JSON.stringify(JOSE_HEADER)))

*Defined in [register.ts:108](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L108)*

___
<a id="sym_cipher_version"></a>

### `<Const>` SYM_CIPHER_VERSION

**● SYM_CIPHER_VERSION**: *"xsalsa20-poly1305"* = "xsalsa20-poly1305"

*Defined in [register.ts:7](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L7)*

___
<a id="randombytes"></a>

### `<Let>` randomBytes

**● randomBytes**: *[RandomBytesSource](../interfaces/_register_.randombytessource.md)* =  naclRandomBytes

*Defined in [register.ts:60](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L60)*

___

## Functions

<a id="createidentity"></a>

###  createIdentity

▸ **createIdentity**(): [NaCLIdentity](../classes/_register_.naclidentity.md)

*Defined in [register.ts:378](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L378)*

Create a new NaCLIDentity

**Returns:** [NaCLIdentity](../classes/_register_.naclidentity.md)

___
<a id="decodebase64url"></a>

###  decodeBase64Url

▸ **decodeBase64Url**(base64url: *`string`*): `Uint8Array`

*Defined in [register.ts:103](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L103)*

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

*Defined in [register.ts:370](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L370)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| did | `string` |

**Returns:** `Uint8Array`

___
<a id="didtosignpubkey"></a>

###  didToSignPubKey

▸ **didToSignPubKey**(did: *`string`*): `Uint8Array`

*Defined in [register.ts:353](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L353)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| did | `string` |

**Returns:** `Uint8Array`

___
<a id="encodebase64url"></a>

###  encodeBase64Url

▸ **encodeBase64Url**(data: *`Uint8Array`*): `string`

*Defined in [register.ts:85](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L85)*

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

*Defined in [register.ts:386](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L386)*

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

*Defined in [register.ts:56](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| length | `number` |

**Returns:** `Promise`<`Uint8Array`>

___
<a id="normalizecleardata"></a>

###  normalizeClearData

▸ **normalizeClearData**(data: *`string` | `Uint8Array`*): `Uint8Array`

*Defined in [register.ts:73](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L73)*

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

*Defined in [register.ts:89](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L89)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| base64url | `string` |

**Returns:** `string`

___
<a id="registernacldid"></a>

###  registerNaclDID

▸ **registerNaclDID**(): `void`

*Defined in [register.ts:395](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L395)*

Registers `nacl` DID resolver

**Returns:** `void`

___
<a id="resolveencryptionpublickey"></a>

###  resolveEncryptionPublicKey

▸ **resolveEncryptionPublicKey**(did: *`string`*): `Promise`<`Uint8Array` | `undefined`>

*Defined in [register.ts:358](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L358)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| did | `string` |

**Returns:** `Promise`<`Uint8Array` | `undefined`>

___
<a id="setrandombytessource"></a>

###  setRandomBytesSource

▸ **setRandomBytesSource**(source: *[RandomBytesSource](../interfaces/_register_.randombytessource.md)*): `void`

*Defined in [register.ts:66](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L66)*

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

*Defined in [register.ts:334](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L334)*

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

*Defined in [register.ts:325](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L325)*

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

*Defined in [register.ts:107](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L107)*

<a id="jose_header.alg"></a>

####  alg

**● alg**: *`string`* = "Ed25519"

*Defined in [register.ts:107](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L107)*

___
<a id="jose_header.typ"></a>

####  typ

**● typ**: *`string`* = "JWT"

*Defined in [register.ts:107](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L107)*

___

___

