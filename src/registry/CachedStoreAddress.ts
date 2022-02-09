import { ethers } from 'ethers'
import { ChainId } from '../types'
import * as Store from './Store'
import * as cache from '../cache/index'

const getOrFetch = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const cached = cache.get(key)

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
