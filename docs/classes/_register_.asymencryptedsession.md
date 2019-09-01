**[nacl-did](../README.md)**

[Globals](../globals.md) › ["register"](../modules/_register_.md) › [AsymEncryptedSession](_register_.asymencryptedsession.md)

# Class: AsymEncryptedSession

## Hierarchy

* [EncryptedSession](_register_.encryptedsession.md)

  * **AsymEncryptedSession**

## Index

### Constructors

* [constructor](_register_.asymencryptedsession.md#constructor)

### Properties

* [from](_register_.asymencryptedsession.md#from)
* [sharedKey](_register_.asymencryptedsession.md#private-sharedkey)
* [template](_register_.asymencryptedsession.md#private-template)
* [to](_register_.asymencryptedsession.md#to)
* [toPublicKey](_register_.asymencryptedsession.md#topublickey)

### Methods

* [decrypt](_register_.asymencryptedsession.md#decrypt)
* [encrypt](_register_.asymencryptedsession.md#encrypt)

## Constructors

###  constructor

\+ **new AsymEncryptedSession**(`from`: string, `to`: string, `toPublicKey`: string, `sharedKey`: Uint8Array): *[AsymEncryptedSession](_register_.asymencryptedsession.md)*

*Overrides [EncryptedSession](_register_.encryptedsession.md).[constructor](_register_.encryptedsession.md#constructor)*

*Defined in [register.ts:272](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L272)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |
`toPublicKey` | string |
`sharedKey` | Uint8Array |

**Returns:** *[AsymEncryptedSession](_register_.asymencryptedsession.md)*

## Properties

###  from

• **from**: *string*

*Defined in [register.ts:269](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L269)*

___

### `Private` sharedKey

• **sharedKey**: *Uint8Array*

*Defined in [register.ts:272](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L272)*

___

### `Private` template

• **template**: *[EncryptedTemplate](../interfaces/_register_.encryptedtemplate.md)*

*Defined in [register.ts:271](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L271)*

___

###  to

• **to**: *string*

*Inherited from [EncryptedSession](_register_.encryptedsession.md).[to](_register_.encryptedsession.md#to)*

*Defined in [register.ts:261](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L261)*

___

###  toPublicKey

• **toPublicKey**: *string*

*Defined in [register.ts:270](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L270)*

## Methods

###  decrypt

▸ **decrypt**(`__namedParameters`: object): *string*

*Overrides [EncryptedSession](_register_.encryptedsession.md).[decrypt](_register_.encryptedsession.md#abstract-decrypt)*

*Defined in [register.ts:304](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L304)*

Decrypt data from counter party or myself

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`ciphertext` | string |
`from` | undefined \| string |
`nonce` | string |
`to` | string |
`version` | string |

**Returns:** *string*

___

###  encrypt

▸ **encrypt**(`data`: string | Uint8Array): *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*

*Overrides [EncryptedSession](_register_.encryptedsession.md).[encrypt](_register_.encryptedsession.md#abstract-encrypt)*

*Defined in [register.ts:291](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L291)*

Encrypt data to recipient

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | string \| Uint8Array |   |

**Returns:** *Promise‹[Encrypted](../interfaces/_register_.encrypted.md)›*