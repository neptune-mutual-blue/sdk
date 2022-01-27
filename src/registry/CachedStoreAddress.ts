import { ethers } from 'ethers'
import LRU from 'lru-cache'
import { ChainId } from '../types'
import * as Store from './Store'

const cache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60
})

const fromCache = (key: string): string | null => {
  const cached = cache.get(key) as string

  if (cached === null) {
    return null
  }

  if (cached === undefined) {
    return null
  }

  if (cache.length > 0) {
    return cached
  }

  return null
}

const getOrFetch = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const cached = fromCache(key)

  if (cached !== null) {
    return cached
  }

  const store = Store.getInstance(chainId, signerOrProvider)

  const address = await store.getAddress(key)
  cache.set(key, address)

  return address
}

export {
  getOrFetch
}
