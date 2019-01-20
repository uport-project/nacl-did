[nacl-did](../README.md) > ["register"](../modules/_register_.md) > [EncryptedSession](../classes/_register_.encryptedsession.md)

# Class: EncryptedSession

## Hierarchy

**EncryptedSession**

↳  [AsymEncryptedSession](_register_.asymencryptedsession.md)

↳  [SymEncryptedSession](_register_.symencryptedsession.md)

## Index

### Constructors

* [constructor](_register_.encryptedsession.md#constructor)

### Properties

* [to](_register_.encryptedsession.md#to)

### Methods

* [decrypt](_register_.encryptedsession.md#decrypt)
* [encrypt](_register_.encryptedsession.md#encrypt)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new EncryptedSession**(to: *`string`*): [EncryptedSession](_register_.encryptedsession.md)

*Defined in [register.ts:248](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L248)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| to | `string` |

**Returns:** [EncryptedSession](_register_.encryptedsession.md)

___

## Properties

<a id="to"></a>

###  to

**● to**: *`string`*

*Defined in [register.ts:248](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L248)*

___

## Methods

<a id="decrypt"></a>

### `<Abstract>` decrypt

▸ **decrypt**(encrypted: *[Encrypted](../interfaces/_register_.encrypted.md)*): `string`

*Defined in [register.ts:253](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L253)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| encrypted | [Encrypted](../interfaces/_register_.encrypted.md) |

**Returns:** `string`

___
<a id="encrypt"></a>

### `<Abstract>` encrypt

▸ **encrypt**(data: *`string` | `Uint8Array`*): `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

*Defined in [register.ts:252](https://github.com/uport-project/nacl-did/blob/89cb74c/src/register.ts#L252)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| data | `string` | `Uint8Array` |

**Returns:** `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

___

