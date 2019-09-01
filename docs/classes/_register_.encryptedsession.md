**[nacl-did](../README.md)**

[Globals](../globals.md) › ["register"](../modules/_register_.md) › [EncryptedSession](_register_.encryptedsession.md)

# Class: EncryptedSession

## Hierarchy

* **EncryptedSession**

  * [AsymEncryptedSession](_register_.asymencryptedsession.md)

  * [SymEncryptedSession](_register_.symencryptedsession.md)

## Index

### Constructors

* [constructor](_register_.encryptedsession.md#constructor)

### Properties

* [to](_register_.encryptedsession.md#to)

### Methods

* [decrypt](_register_.encryptedsession.md#abstract-decrypt)
* [encrypt](_register_.encryptedsession.md#abstract-encrypt)

## Constructors

###  constructor

\+ **new EncryptedSession**(`to`: string): *[EncryptedSession](_register_.encryptedsession.md)*

*Defined in [register.ts:261](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`to` | string |

**Returns:** *[EncryptedSession](_register_.encryptedsession.md)*

## Properties

###  to

• **to**: *string*

*Defined in [register.ts:261](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L261)*

## Methods

### `Abstract` decrypt

▸ **decrypt**(`encrypted`: [Encrypted](../interfaces/_register_.encrypted.md)): *string*

*Defined in [register.ts:266](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`encrypted` | [Encrypted](../interfaces/_register_.encrypted.md) |

**Returns:** *string*

___

### `Abstract` encrypt

▸ **encrypt**(`data`: string | Uint8Array): *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*

*Defined in [register.ts:265](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L265)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string \| Uint8Array |

**Returns:** *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*