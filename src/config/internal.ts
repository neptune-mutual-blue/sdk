import { type SDKInternalStorage } from '../types/SDKInternalStorage.js'

const _STORAGE: SDKInternalStorage = {
  initialized: false
}

export const initialize = ({ store }: { store: SDKInternalStorage['store'] }): void => {
  _STORAGE.initialized = true

  _STORAGE.store = store
}

export const getStorageValue = <T extends keyof SDKInternalStorage>(key: T): SDKInternalStorage[T] => {
  if (!_STORAGE.initialized) {
    throw new Error('SDK not initialized')
  }

  return _STORAGE[key]
}
