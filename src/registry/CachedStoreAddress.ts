import { type Signer } from '@ethersproject/abstract-signer'
import { type Provider } from '@ethersproject/providers'

import * as cache from '../cache/index.js'
import { type ChainId } from '../types/index.js'
import * as Store from './Store.js'

const getOrFetch = async (chainId: ChainId, nsKey: string, signerOrProvider: Provider | Signer): Promise<string> => {
  const cacheKey = cache.genKey(chainId, nsKey)
  const cached = cache.get(cacheKey)

  if (cached !== null) {
    return cached
  }

  const store = Store.getInstance(chainId, signerOrProvider)

  const address = await store.getAddress(nsKey)
  cache.set(cacheKey, address)

  return address
}

export { getOrFetch }
