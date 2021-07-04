# Neptune Mutual SDK

The Neptune Mutual SDK assists developers to build on top of Neptune Mutual protocol. The SDK supports any Javascript environment so that you can interact with the SDK from both frontend and backend.

**Install Package**

```
npm install @neptunemutual/sdk
```

## Multiple Blockchain Support

Since the SDK supports multiple blockchains, you may want to quickly check the list of supported blockchains before you actually implement anything.

```javascript
import { ChainId } from '@neptunemutual/sdk'

console.info('Supported Chains %s', ChainId)

/********************************************
Supported Chains {
  '1': 'Ethereum',
  '3': 'Ropsten',
  '56': 'BinanceSmartChain',
  '100': 'xDaiChain',
  '137': 'Polygon',
  '250': 'Fantom',
  '1284': 'MoonBeam',
  '80001': 'Mumbai',
  Ethereum: 1,
  Ropsten: 3,
  BinanceSmartChain: 56,
  xDaiChain: 100,
  Polygon: 137,
  Fantom: 250,
  MoonBeam: 1284,
  Mumbai: 80001
}
********************************************/
```

## Signer or Provider

The SDK automatically creates a default readonly provider for you. Therefore, you do not need to specify a signer or provider for such operations. However, for write operations, you must pass a signer as the last argument.

**Getting Cover Info by Passing a Provider**

```javascript
import { ethers } from 'ethers'
import { ChainId, cover } from '@neptunemutual/sdk'

const myProvider = () => {
  const fakePrivateKey = '0586782a6b30a2526f960bfde45db0470c51919c0ac2ae9ad5ad39b847955109'
  const provider = new ethers.providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com')
  return new ethers.Wallet(fakePrivateKey, provider)
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

[Read the Full Documentation](https://app.gitbook.com/@neptunemutual/s/docs/neptune-mutual-sdk/quickstart)
