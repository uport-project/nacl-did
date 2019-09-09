**[nacl-did](../README.md)**

[Globals](../globals.md) › ["nacldid"](../modules/_nacldid_.md) › [EncryptedSession](_nacldid_.encryptedsession.md)

# Class: EncryptedSession

## Hierarchy

* **EncryptedSession**

  * [AsymEncryptedSession](_nacldid_.asymencryptedsession.md)

  * [SymEncryptedSession](_nacldid_.symencryptedsession.md)

## Index

### Constructors

* [constructor](_nacldid_.encryptedsession.md#constructor)

### Properties

* [to](_nacldid_.encryptedsession.md#to)

### Methods

* [decrypt](_nacldid_.encryptedsession.md#abstract-decrypt)
* [encrypt](_nacldid_.encryptedsession.md#abstract-encrypt)

## Constructors

###  constructor

\+ **new EncryptedSession**(`to`: string): *[EncryptedSession](_nacldid_.encryptedsession.md)*

*Defined in [nacldid.ts:261](https://github.com/uport-project/nacl-did/blob/417d425/src/nacldid.ts#L261)*

**Parameters:**

Name | Type |
------ | ------ |
`to` | string |

**Returns:** *[EncryptedSession](_nacldid_.encryptedsession.md)*

## Properties

###  to

• **to**: *string*

*Defined in [nacldid.ts:261](https://github.com/uport-project/nacl-did/blob/417d425/src/nacldid.ts#L261)*

## Methods

### `Abstract` decrypt

▸ **decrypt**(`encrypted`: [Encrypted](../interfaces/_nacldid_.encrypted.md)): *string*

*Defined in [nacldid.ts:266](https://github.com/uport-project/nacl-did/blob/417d425/src/nacldid.ts#L266)*

**Parameters:**

Name | Type |
------ | ------ |
`encrypted` | [Encrypted](../interfaces/_nacldid_.encrypted.md) |

**Returns:** *string*

___

### `Abstract` encrypt

▸ **encrypt**(`data`: string | Uint8Array): *Promise‹[Encrypted](../interfaces/_nacldid_.encrypted.md)›*

*Defined in [nacldid.ts:265](https://github.com/uport-project/nacl-did/blob/417d425/src/nacldid.ts#L265)*

**Parameters:**

Name | Type |
------ | ------ |
`data` | string \| Uint8Array |

**Returns:** *Promise‹[Encrypted](../interfaces/_nacldid_.encrypted.md)›*