[nacl-did](../README.md) > ["register"](../modules/_register_.md) > [EncryptedSession](../classes/_register_.encryptedsession.md)

# Class: EncryptedSession

## Hierarchy

**EncryptedSession**

## Index

### Constructors

* [constructor](_register_.encryptedsession.md#constructor)

### Properties

* [from](_register_.encryptedsession.md#from)
* [sharedKey](_register_.encryptedsession.md#sharedkey)
* [template](_register_.encryptedsession.md#template)
* [to](_register_.encryptedsession.md#to)
* [toPublicKey](_register_.encryptedsession.md#topublickey)

### Methods

* [close](_register_.encryptedsession.md#close)
* [decrypt](_register_.encryptedsession.md#decrypt)
* [encrypt](_register_.encryptedsession.md#encrypt)
* [isOpen](_register_.encryptedsession.md#isopen)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new EncryptedSession**(from: *`string`*, to: *`string`*, toPublicKey: *`string`*, sharedKey: *`Uint8Array`*): [EncryptedSession](_register_.encryptedsession.md)

*Defined in [register.ts:227](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L227)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| from | `string` |
| to | `string` |
| toPublicKey | `string` |
| sharedKey | `Uint8Array` |

**Returns:** [EncryptedSession](_register_.encryptedsession.md)

___

## Properties

<a id="from"></a>

###  from

**● from**: *`string`*

*Defined in [register.ts:223](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L223)*

___
<a id="sharedkey"></a>

### `<Private>` sharedKey

**● sharedKey**: *`Uint8Array`*

*Defined in [register.ts:227](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L227)*

___
<a id="template"></a>

### `<Private>` template

**● template**: *[EncryptedTemplate](../interfaces/_register_.encryptedtemplate.md)*

*Defined in [register.ts:226](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L226)*

___
<a id="to"></a>

###  to

**● to**: *`string`*

*Defined in [register.ts:224](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L224)*

___
<a id="topublickey"></a>

###  toPublicKey

**● toPublicKey**: *`string`*

*Defined in [register.ts:225](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L225)*

___

## Methods

<a id="close"></a>

###  close

▸ **close**(): `void`

*Defined in [register.ts:271](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L271)*

**Returns:** `void`

___
<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(__namedParameters: *`object`*): `null` | `Uint8Array`

*Defined in [register.ts:260](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L260)*

Decrypt data from counter party

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

▸ **encrypt**(data: *`string` | `Uint8Array`*): `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

*Defined in [register.ts:246](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L246)*

Encrypt data to recipient

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `string` | `Uint8Array` |   |

**Returns:** `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

___
<a id="isopen"></a>

###  isOpen

▸ **isOpen**(): `boolean`

*Defined in [register.ts:267](https://github.com/uport-project/nacl-did/blob/323afe1/src/register.ts#L267)*

**Returns:** `boolean`

___

