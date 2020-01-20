**[nacl-did](../README.md)**

[Globals](../globals.md) › ["nacldid"](../modules/_nacldid_.md) › [AsymEncryptedSession](_nacldid_.asymencryptedsession.md)

# Class: AsymEncryptedSession

## Hierarchy

* [EncryptedSession](_nacldid_.encryptedsession.md)

  * **AsymEncryptedSession**

## Index

### Constructors

* [constructor](_nacldid_.asymencryptedsession.md#constructor)

### Properties

* [from](_nacldid_.asymencryptedsession.md#from)
* [sharedKey](_nacldid_.asymencryptedsession.md#private-sharedkey)
* [template](_nacldid_.asymencryptedsession.md#private-template)
* [to](_nacldid_.asymencryptedsession.md#to)
* [toPublicKey](_nacldid_.asymencryptedsession.md#topublickey)

### Methods

* [decrypt](_nacldid_.asymencryptedsession.md#decrypt)
* [encrypt](_nacldid_.asymencryptedsession.md#encrypt)

## Constructors

###  constructor

\+ **new AsymEncryptedSession**(`from`: string, `to`: string, `toPublicKey`: string, `sharedKey`: Uint8Array): *[AsymEncryptedSession](_nacldid_.asymencryptedsession.md)*

*Overrides [EncryptedSession](_nacldid_.encryptedsession.md).[constructor](_nacldid_.encryptedsession.md#constructor)*

*Defined in [nacldid.ts:338](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L338)*

**Parameters:**

Name | Type |
------ | ------ |
`from` | string |
`to` | string |
`toPublicKey` | string |
`sharedKey` | Uint8Array |

**Returns:** *[AsymEncryptedSession](_nacldid_.asymencryptedsession.md)*

## Properties

###  from

• **from**: *string*

*Defined in [nacldid.ts:335](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L335)*

___

### `Private` sharedKey

• **sharedKey**: *Uint8Array*

*Defined in [nacldid.ts:338](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L338)*

___

### `Private` template

• **template**: *[EncryptedTemplate](../interfaces/_nacldid_.encryptedtemplate.md)*

*Defined in [nacldid.ts:337](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L337)*

___

###  to

• **to**: *string*

*Inherited from [EncryptedSession](_nacldid_.encryptedsession.md).[to](_nacldid_.encryptedsession.md#to)*

*Defined in [nacldid.ts:327](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L327)*

___

###  toPublicKey

• **toPublicKey**: *string*

*Defined in [nacldid.ts:336](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L336)*

## Methods

###  decrypt

▸ **decrypt**(`__namedParameters`: object): *string*

*Overrides [EncryptedSession](_nacldid_.encryptedsession.md).[decrypt](_nacldid_.encryptedsession.md#abstract-decrypt)*

*Defined in [nacldid.ts:379](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L379)*

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

▸ **encrypt**(`data`: string | Uint8Array): *Promise‹[Encrypted](../interfaces/_nacldid_.encrypted.md)›*

*Overrides [EncryptedSession](_nacldid_.encryptedsession.md).[encrypt](_nacldid_.encryptedsession.md#abstract-encrypt)*

*Defined in [nacldid.ts:362](https://github.com/uport-project/nacl-did/blob/c90edba/src/nacldid.ts#L362)*

Encrypt data to recipient

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`data` | string \| Uint8Array |   |

**Returns:** *Promise‹[Encrypted](../interfaces/_nacldid_.encrypted.md)›*