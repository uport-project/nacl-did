[nacl-did](../README.md) > ["register"](../modules/_register_.md) > [NaCLIdentity](../classes/_register_.naclidentity.md)

# Class: NaCLIdentity

Encapsulates the functionality of an identity using the `nacl-did` method

## Hierarchy

**NaCLIdentity**

## Index

### Constructors

* [constructor](_register_.naclidentity.md#constructor)

### Properties

* [did](_register_.naclidentity.md#did)
* [encPrivateKey](_register_.naclidentity.md#encprivatekey)
* [encPublicKey](_register_.naclidentity.md#encpublickey)
* [privateKey](_register_.naclidentity.md#privatekey)
* [publicKey](_register_.naclidentity.md#publickey)

### Methods

* [createJWT](_register_.naclidentity.md#createjwt)
* [decrypt](_register_.naclidentity.md#decrypt)
* [encrypt](_register_.naclidentity.md#encrypt)
* [openSession](_register_.naclidentity.md#opensession)
* [sign](_register_.naclidentity.md#sign)
* [toJSON](_register_.naclidentity.md#tojson)
* [verify](_register_.naclidentity.md#verify)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new NaCLIdentity**(kp: *[NaCLKeyPair](../interfaces/_register_.naclkeypair.md)*): [NaCLIdentity](_register_.naclidentity.md)

*Defined in [register.ts:117](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L117)*

Create a new NaCL Identity for a KeyPair

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| kp | [NaCLKeyPair](../interfaces/_register_.naclkeypair.md) |  a KeyPair generated prior from nacl.box.keyPair() |

**Returns:** [NaCLIdentity](_register_.naclidentity.md)

___

## Properties

<a id="did"></a>

###  did

**● did**: *`string`*

*Defined in [register.ts:113](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L113)*

___
<a id="encprivatekey"></a>

### `<Private>` encPrivateKey

**● encPrivateKey**: *`Uint8Array`*

*Defined in [register.ts:115](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L115)*

___
<a id="encpublickey"></a>

###  encPublicKey

**● encPublicKey**: *`Uint8Array`*

*Defined in [register.ts:117](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L117)*

___
<a id="privatekey"></a>

### `<Private>` privateKey

**● privateKey**: *`Uint8Array`*

*Defined in [register.ts:114](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L114)*

___
<a id="publickey"></a>

###  publicKey

**● publicKey**: *`Uint8Array`*

*Defined in [register.ts:116](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L116)*

___

## Methods

<a id="createjwt"></a>

###  createJWT

▸ **createJWT**(payload: *`Object`*): `string`

*Defined in [register.ts:164](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L164)*

Creates a signed JWT using the following header `{ typ: 'JWT', alg: 'Ed25519' }`

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| payload | `Object` |  Any valid JSON encodeable JS object |

**Returns:** `string`

___
<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(__namedParameters: *`object`*): `null` | `Uint8Array`

*Defined in [register.ts:213](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L213)*

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| ciphertext | `string` |
| from | `string` |
| nonce | `string` |
| to | `string` |
| version | `string` |

**Returns:** `null` | `Uint8Array`

___
<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(to: *`string`*, data: *`string` | `Uint8Array`*): `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

*Defined in [register.ts:198](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L198)*

Encrypt a single message to send to a recipient

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| to | `string` |  DID of recipient |
| data | `string` | `Uint8Array` |  Data to encrypt |

**Returns:** `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

___
<a id="opensession"></a>

###  openSession

▸ **openSession**(to: *`string`*, overridePublicKey?: *`boolean` | `string`*): `Promise`<[EncryptedSession](_register_.encryptedsession.md)>

*Defined in [register.ts:177](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L177)*

Opens an efficient session for encrypting and decrypting messages between this and another DID.

**Parameters:**

| Name | Type | Default value | Description |
| ------ | ------ | ------ | ------ |
| to | `string` | - |  DID of recipient |
| `Default value` overridePublicKey | `boolean` | `string` | false |  If DID method does not contain an encryption public key use this key or \`true\` to create a new ephemeral key |

**Returns:** `Promise`<[EncryptedSession](_register_.encryptedsession.md)>

___
<a id="sign"></a>

###  sign

▸ **sign**(data: *`string` | `Uint8Array`*): [SignedData](../interfaces/_register_.signeddata.md)

*Defined in [register.ts:144](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L144)*

Signs data and returns the data, did and signature

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `string` | `Uint8Array` |   |

**Returns:** [SignedData](../interfaces/_register_.signeddata.md)

___
<a id="tojson"></a>

###  toJSON

▸ **toJSON**(): [SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md)

*Defined in [register.ts:136](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L136)*

Serializes NaclDID to just it's base64 encoded private key and DID

**Returns:** [SerializableNaCLIdentity](../interfaces/_register_.serializablenaclidentity.md)

___
<a id="verify"></a>

###  verify

▸ **verify**(signed: *[SignedData](../interfaces/_register_.signeddata.md)*): `boolean`

*Defined in [register.ts:156](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L156)*

Verifies that Signed Data was signed by this identity

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| signed | [SignedData](../interfaces/_register_.signeddata.md) |   |

**Returns:** `boolean`

___

