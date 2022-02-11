import { ethers } from 'ethers'
import { ICacheProvider } from '../types/ICacheProvider'
import { BrowserCacheProvider } from './browser-cache-provider'
import { LruCacheProvider } from './lru-cache-provider'
import { localStorageAvailable } from '../utils/local-storage'
import { getStoreAddressFromEnvironment } from '../config/store'
import { ChainId } from '../types/ChainId'

const getProvider = (): ICacheProvider => {
  if (localStorageAvailable()) {
    return new BrowserCacheProvider()
  }

  return new LruCacheProvider()
}

const genKey = (chainId: ChainId, nsKey: string): string => {
  const store = getStoreAddressFromEnvironment(chainId)
  return ethers.utils.solidityKeccak256(['uint256', 'address', 'bytes32'], [chainId.toString(), store, nsKey])
}

const get = (key: string): string | null => {
  const provider = getProvider()
  return provider.get(key)
}

const set = (key: string, value: string): void => {
  const provider = getProvider()
  provider.set(key, value)
}

const remove = (key: string): void => {
  const provider = getProvider()
  provider.remove(key)
}

export {
  genKey,
  get,
  set,
  remove
}
