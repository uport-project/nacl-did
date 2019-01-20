[nacl-did](../README.md) > ["register"](../modules/_register_.md) > [AsymEncryptedSession](../classes/_register_.asymencryptedsession.md)

# Class: AsymEncryptedSession

## Hierarchy

 [EncryptedSession](_register_.encryptedsession.md)

**↳ AsymEncryptedSession**

## Index

### Constructors

* [constructor](_register_.asymencryptedsession.md#constructor)

### Properties

* [from](_register_.asymencryptedsession.md#from)
* [sharedKey](_register_.asymencryptedsession.md#sharedkey)
* [template](_register_.asymencryptedsession.md#template)
* [to](_register_.asymencryptedsession.md#to)
* [toPublicKey](_register_.asymencryptedsession.md#topublickey)

### Methods

* [decrypt](_register_.asymencryptedsession.md#decrypt)
* [encrypt](_register_.asymencryptedsession.md#encrypt)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new AsymEncryptedSession**(from: *`string`*, to: *`string`*, toPublicKey: *`string`*, sharedKey: *`Uint8Array`*): [AsymEncryptedSession](_register_.asymencryptedsession.md)

*Overrides [EncryptedSession](_register_.encryptedsession.md).[constructor](_register_.encryptedsession.md#constructor)*

*Defined in [register.ts:259](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L259)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| from | `string` |
| to | `string` |
| toPublicKey | `string` |
| sharedKey | `Uint8Array` |

**Returns:** [AsymEncryptedSession](_register_.asymencryptedsession.md)

___

## Properties

<a id="from"></a>

###  from

**● from**: *`string`*

*Defined in [register.ts:256](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L256)*

___
<a id="sharedkey"></a>

### `<Private>` sharedKey

**● sharedKey**: *`Uint8Array`*

*Defined in [register.ts:259](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L259)*

___
<a id="template"></a>

### `<Private>` template

**● template**: *[EncryptedTemplate](../interfaces/_register_.encryptedtemplate.md)*

*Defined in [register.ts:258](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L258)*

___
<a id="to"></a>

###  to

**● to**: *`string`*

*Inherited from [EncryptedSession](_register_.encryptedsession.md).[to](_register_.encryptedsession.md#to)*

*Defined in [register.ts:248](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L248)*

___
<a id="topublickey"></a>

###  toPublicKey

**● toPublicKey**: *`string`*

*Defined in [register.ts:257](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L257)*

___

## Methods

<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(__namedParameters: *`object`*): `string`

*Overrides [EncryptedSession](_register_.encryptedsession.md).[decrypt](_register_.encryptedsession.md#decrypt)*

*Defined in [register.ts:291](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L291)*

Decrypt data from counter party or myself

**Parameters:**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| ciphertext | `string` |
| from | `undefined` | `string` |
| nonce | `string` |
| to | `string` |
| version | `string` |

**Returns:** `string`

___
<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(data: *`string` | `Uint8Array`*): `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

*Overrides [EncryptedSession](_register_.encryptedsession.md).[encrypt](_register_.encryptedsession.md#encrypt)*

*Defined in [register.ts:278](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L278)*

Encrypt data to recipient

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `string` | `Uint8Array` |   |

**Returns:** `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

___

