import { type ChainId } from '../../types/index.js'
import { InvalidStoreError } from '../../types/Exceptions/InvalidStoreError.js'
import { getDefinition } from './definition.js'

const getStoreAddressFromEnvironment = (chainId: ChainId): string => {
  const { env, next, fallback } = getDefinition()[chainId]

  if (env !== undefined) {
    return env
  }

  if (next !== undefined) {
    return next
  }

  if (fallback !== undefined) {
    return fallback
  }

  throw new InvalidStoreError('Store not found')
}

export { getStoreAddressFromEnvironment }
