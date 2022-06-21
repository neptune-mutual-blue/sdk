import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { ChainId } from '../types'
import * as Store from './Store'
import * as cache from '../cache/index'

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

export {
  getOrFetch
}
