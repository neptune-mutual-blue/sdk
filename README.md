# Neptune Mutual SDK

The Neptune Mutual SDK assists developers to build on top of Neptune Mutual protocol. The SDK supports any Javascript environment so that you can interact with the SDK from both frontend and backend.

**Install Package**

```
npm install @neptunemutual/sdk
```

**Requirements**

- Node version: >= v18

## Multiple Blockchain Support

Since the SDK supports multiple blockchains, you may want to quickly check the list of supported blockchains before you actually implement anything.

```javascript
import { ChainId } from '@neptunemutual/sdk'

console.info('Supported Chains %s', ChainId)

/********************************************
Supported Chains {
  '1': 'Ethereum',
  '42161': 'Arbitrum',
  '3': 'Ropsten',
  '56': 'BinanceSmartChain',
  '43113': 'Fuji',
  '80001': 'Mumbai',
  Ethereum: 1,
  Arbitrum: 42161,
  Ropsten: 3,
  BinanceSmartChain: 56,
  Fuji: 43113,
  Mumbai: 80001
}
********************************************/
```

## Signer or Provider

The SDK automatically creates a default readonly provider for you. Therefore, you do not need to specify a signer or provider for such operations. However, for write operations, you must pass a signer as the last argument.

**Getting Cover Info by Passing a Provider**

```javascript
import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { ChainId, cover } from '@neptunemutual/sdk'

const myProvider = () => {
  const fakePrivateKey = '0586782a6b30a2526f960bfde45db0470c51919c0ac2ae9ad5ad39b847955109'
  const provider = new JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  return new Wallet(fakePrivateKey, provider)
}

const readCoverInfo = async () => {
  const key = '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000001'
  const provider = myProvider()

  const coverInfo = await cover.getCoverInfo(ChainId.Mumbai, key, provider)
  console.log(coverInfo)
}

readCoverInfo()
```

In this case, you're only reading from the blockchain. The above code can be simplified to this: 


```javascript
import { ChainId, cover } from '@neptunemutual/sdk'

const readCoverInfo = async () => {
  const key = '0x70726f746f3a636f6e7472616374733a636f7665723a6366633a303100000001'

  const coverInfo = await cover.getCoverInfo(ChainId.Mumbai, key)
  console.log(coverInfo)
}

readCoverInfo()
```

## Initialize

Certain functionality of the SDK depends on store smart contract. Store contract address can be set using the `initialize` function

```js
import sdk, { ChainId } from '@neptunemutual/sdk'

sdk.initialize({
  store: {
    [ChainId.Mumbai]: '0x...'
  }
})

const coverKey = sdk.utils.keyUtil.toBytes32('binance')
const coverInfo = await sdk.cover.getCoverInfo(ChainId.Mumbai, coverKey, provider)

console.log(coverInfo);
```

[Read the Full Documentation](https://neptunemutual.com/docs/sdk/quickstart/)
