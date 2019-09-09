**[nacl-did](../README.md)**

[Globals](../globals.md) › ["nacldid"](../modules/_nacldid_.md) › [RandomBytesSource](_nacldid_.randombytessource.md)

# Interface: RandomBytesSource

Implement this to use a custom async random source

## Hierarchy

* **RandomBytesSource**

## Callable

▸ (`length`: number): *Promise‹Uint8Array›*

*Defined in [nacldid.ts:52](https://github.com/uport-project/nacl-did/blob/ce82fa9/src/nacldid.ts#L52)*

Implement this to use a custom async random source

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`length` | number | is the length of the Random Bytes requested. |

**Returns:** *Promise‹Uint8Array›*

a Promise returning a Uint8Array