**[nacl-did](../README.md)**

[Globals](../globals.md) › ["register"](../modules/_register_.md) › [RandomBytesSource](_register_.randombytessource.md)

# Interface: RandomBytesSource

Implement this to use a custom async random source

## Hierarchy

* **RandomBytesSource**

## Callable

▸ (`length`: number): *Promise‹Uint8Array›*

*Defined in [register.ts:52](https://github.com/uport-project/nacl-did/blob/450728f/src/register.ts#L52)*

Implement this to use a custom async random source

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`length` | number | is the length of the Random Bytes requested. |

**Returns:** *Promise‹Uint8Array›*

a Promise returning a Uint8Array