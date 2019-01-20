[nacl-did](../README.md) > ["register"](../modules/_register_.md) > [SymEncryptedSession](../classes/_register_.symencryptedsession.md)

# Class: SymEncryptedSession

## Hierarchy

 [EncryptedSession](_register_.encryptedsession.md)

**↳ SymEncryptedSession**

## Index

### Constructors

* [constructor](_register_.symencryptedsession.md#constructor)

### Properties

* [id](_register_.symencryptedsession.md#id)
* [to](_register_.symencryptedsession.md#to)

### Methods

* [decrypt](_register_.symencryptedsession.md#decrypt)
* [encrypt](_register_.symencryptedsession.md#encrypt)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new SymEncryptedSession**(id: *[NaCLIdentity](_register_.naclidentity.md)*): [SymEncryptedSession](_register_.symencryptedsession.md)

*Overrides [EncryptedSession](_register_.encryptedsession.md).[constructor](_register_.encryptedsession.md#constructor)*

*Defined in [register.ts:299](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L299)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| id | [NaCLIdentity](_register_.naclidentity.md) |

**Returns:** [SymEncryptedSession](_register_.symencryptedsession.md)

___

## Properties

<a id="id"></a>

### `<Private>` id

**● id**: *[NaCLIdentity](_register_.naclidentity.md)*

*Defined in [register.ts:299](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L299)*

___
<a id="to"></a>

###  to

**● to**: *`string`*

*Inherited from [EncryptedSession](_register_.encryptedsession.md).[to](_register_.encryptedsession.md#to)*

*Defined in [register.ts:248](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L248)*

___

## Methods

<a id="decrypt"></a>

###  decrypt

▸ **decrypt**(encrypted: *[Encrypted](../interfaces/_register_.encrypted.md)*): `string`

*Overrides [EncryptedSession](_register_.encryptedsession.md).[decrypt](_register_.encryptedsession.md#decrypt)*

*Defined in [register.ts:316](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L316)*

Decrypt data from counter party

**Parameters:**

| Name | Type |
| ------ | ------ |
| encrypted | [Encrypted](../interfaces/_register_.encrypted.md) |

**Returns:** `string`

___
<a id="encrypt"></a>

###  encrypt

▸ **encrypt**(data: *`string` | `Uint8Array`*): `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

*Overrides [EncryptedSession](_register_.encryptedsession.md).[encrypt](_register_.encryptedsession.md#encrypt)*

*Defined in [register.ts:309](https://github.com/uport-project/nacl-did/blob/16f44b5/src/register.ts#L309)*

Encrypt data to recipient

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| data | `string` | `Uint8Array` |   |

**Returns:** `Promise`<[Encrypted](../interfaces/_register_.encrypted.md)>

___

