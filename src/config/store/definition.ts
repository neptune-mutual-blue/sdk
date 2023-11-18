import { type ChainId } from '../../types/ChainId.js'
import { getStorageValue } from '../internal.js'

export const getDefinition = (chainId: ChainId): string | undefined => {
  const storeAddresses = getStorageValue('store')
  const store = typeof storeAddresses !== 'undefined' ? storeAddresses[chainId] : ''

  if (typeof store === 'undefined' || store === '') {
    console.error('Store not configured for chain id: %s', chainId)
    return
  }

  return store
}
