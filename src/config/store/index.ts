import { InvalidStoreError } from '../../types/Exceptions/InvalidStoreError.js'
import { ChainId } from '../../types/index.js'
import { getDefinition } from './definition.js'

const getStoreAddressFromEnvironment = (chainId: ChainId): string => {
  if (chainId === ChainId.Invalid) {
    throw new InvalidStoreError('Store not found')
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

  throw new InvalidStoreError('Store not found')
}

export { getStoreAddressFromEnvironment }
