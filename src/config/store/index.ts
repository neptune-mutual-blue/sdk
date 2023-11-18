import { InvalidStoreError } from '../../types/Exceptions/InvalidStoreError.js'
import { type ChainId } from '../../types/index.js'
import { getDefinition } from './definition.js'

const getStoreAddressFromEnvironment = (chainId: ChainId): string => {
  const store = getDefinition(chainId)

  if (store !== undefined) {
    return store
  }

  throw new InvalidStoreError('Store not found')
}

export { getStoreAddressFromEnvironment }
