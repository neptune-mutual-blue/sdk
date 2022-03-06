import { ChainId } from '../../types'
import { InvalidStoreError } from '../../types/Exceptions/InvalidStoreError'
import { getDefinition } from './definition'

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
