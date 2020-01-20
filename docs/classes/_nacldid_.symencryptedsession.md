**[nacl-did](../README.md)**

[Globals](../globals.md) › ["nacldid"](../modules/_nacldid_.md) › [SymEncryptedSession](_nacldid_.symencryptedsession.md)

# Class: SymEncryptedSession

## Hierarchy

* [EncryptedSession](_nacldid_.encryptedsession.md)

  * **SymEncryptedSession**

## Index

### Constructors

* [constructor](_nacldid_.symencryptedsession.md#constructor)

### Properties

* [id](_nacldid_.symencryptedsession.md#private-id)
* [to](_nacldid_.symencryptedsession.md#to)

### Methods

* [decrypt](_nacldid_.symencryptedsession.md#decrypt)
* [encrypt](_nacldid_.symencryptedsession.md#encrypt)

## Constructors

###  constructor

\+ **new SymEncryptedSession**(`id`: [NaCLIdentity](_nacldid_.naclidentity.md)): *[SymEncryptedSession](_nacldid_.symencryptedsession.md)*

*Overrides [EncryptedSession](_nacldid_.encryptedsession.md).[constructor](_nacldid_.encryptedsession.md#constructor)*

*Defined in [nacldid.ts:397](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L397)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | [NaCLIdentity](_nacldid_.naclidentity.md) |

**Returns:** *[SymEncryptedSession](_nacldid_.symencryptedsession.md)*

## Properties

### `Private` id

• **id**: *[NaCLIdentity](_nacldid_.naclidentity.md)*

*Defined in [nacldid.ts:397](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L397)*

___

###  to

• **to**: *string*

*Inherited from [EncryptedSession](_nacldid_.encryptedsession.md).[to](_nacldid_.encryptedsession.md#to)*

*Defined in [nacldid.ts:327](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L327)*

## Methods

###  decrypt

▸ **decrypt**(`encrypted`: [Encrypted](../interfaces/_nacldid_.encrypted.md)): *string*

*Overrides [EncryptedSession](_nacldid_.encryptedsession.md).[decrypt](_nacldid_.encryptedsession.md#abstract-decrypt)*

*Defined in [nacldid.ts:414](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L414)*

Decrypt data from counter party

**Parameters:**

Name | Type |
------ | ------ |
`encrypted` | [Encrypted](../interfaces/_nacldid_.encrypted.md) |

**Returns:** *string*

___

###  encrypt

▸ **encrypt**(`data`: string | Uint8Array): *Promise‹[Encrypted](../interfaces/_nacldid_.encrypted.md)›*

*Overrides [EncryptedSession](_nacldid_.encryptedsession.md).[encrypt](_nacldid_.encryptedsession.md#abstract-encrypt)*

*Defined in [nacldid.ts:407](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L407)*

Encrypt data to recipient

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | string \| Uint8Array |   |

**Returns:** *Promise‹[Encrypted](../interfaces/_nacldid_.encrypted.md)›*