**[nacl-did](../README.md)**

[Globals](../globals.md) › ["register"](../modules/_register_.md) › [SymEncryptedSession](_register_.symencryptedsession.md)

# Class: SymEncryptedSession

## Hierarchy

* [EncryptedSession](_register_.encryptedsession.md)

  * **SymEncryptedSession**

## Index

### Constructors

* [constructor](_register_.symencryptedsession.md#constructor)

### Properties

* [id](_register_.symencryptedsession.md#private-id)
* [to](_register_.symencryptedsession.md#to)

### Methods

* [decrypt](_register_.symencryptedsession.md#decrypt)
* [encrypt](_register_.symencryptedsession.md#encrypt)

## Constructors

###  constructor

\+ **new SymEncryptedSession**(`id`: [NaCLIdentity](_register_.naclidentity.md)): *[SymEncryptedSession](_register_.symencryptedsession.md)*

*Overrides [EncryptedSession](_register_.encryptedsession.md).[constructor](_register_.encryptedsession.md#constructor)*

*Defined in [register.ts:312](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L312)*

**Parameters:**

Name | Type |
------ | ------ |
`id` | [NaCLIdentity](_register_.naclidentity.md) |

**Returns:** *[SymEncryptedSession](_register_.symencryptedsession.md)*

## Properties

### `Private` id

• **id**: *[NaCLIdentity](_register_.naclidentity.md)*

*Defined in [register.ts:312](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L312)*

___

###  to

• **to**: *string*

*Inherited from [EncryptedSession](_register_.encryptedsession.md).[to](_register_.encryptedsession.md#to)*

*Defined in [register.ts:261](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L261)*

## Methods

###  decrypt

▸ **decrypt**(`encrypted`: [Encrypted](../interfaces/_register_.encrypted.md)): *string*

*Overrides [EncryptedSession](_register_.encryptedsession.md).[decrypt](_register_.encryptedsession.md#abstract-decrypt)*

*Defined in [register.ts:329](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L329)*

Decrypt data from counter party

**Parameters:**

Name | Type |
------ | ------ |
`encrypted` | [Encrypted](../interfaces/_register_.encrypted.md) |

**Returns:** *string*

___

###  encrypt

▸ **encrypt**(`data`: string | Uint8Array): *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*

*Overrides [EncryptedSession](_register_.encryptedsession.md).[encrypt](_register_.encryptedsession.md#abstract-encrypt)*

*Defined in [register.ts:322](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L322)*

Encrypt data to recipient

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | string \| Uint8Array |   |

**Returns:** *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*