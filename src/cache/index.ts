import { ICacheProvider } from '../types/ICacheProvider'
import { BrowserCacheProvider } from './browser-cache-provider'
import { LruCacheProvider } from './lru-cache-provider'
import { localStorageAvailable } from '../utils/local-storage'

const getProvider = (): ICacheProvider => {
  if (localStorageAvailable()) {
    return new BrowserCacheProvider()
  }

  return new LruCacheProvider()
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
  get,
  set,
  remove
}
