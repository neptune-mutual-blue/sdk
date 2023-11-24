import {
  InvalidChainIdError
} from '../../types/Exceptions/InvalidChainIdError.js'
import { InvalidStoreError } from '../../types/Exceptions/InvalidStoreError.js'
import { ChainId } from '../../types/index.js'
import { getStorageValue } from '../internal.js'
import { getDefinition } from './definition.js'

const getStoreAddressFromEnvironment = (chainId: ChainId): string => {
  if (chainId === ChainId.Invalid) {
    throw new InvalidChainIdError('Invalid Chain Id')
  }

  const { env, next, fallback } = getDefinition()[chainId]

  if (env !== undefined && env !== '') {
    return env
  }

  if (next !== undefined && next !== '') {
    return next
  }

  if (fallback !== undefined && fallback !== '') {
    return fallback
  }

  const storeAddresses = getStorageValue('store')

  const value = storeAddresses?.[chainId]

  if (value !== undefined && value !== '') {
    return value
  }

  throw new InvalidStoreError('Store not found')
}

export { getStoreAddressFromEnvironment }
