import { ChainId } from '../../types/ChainId.js'
import { getStorageValue } from '../internal.js'

export const getDefinition = (): Record<Exclude<ChainId, ChainId.Invalid>, Record<'env' | 'next' | 'fallback', string | undefined>> => {
  const storeAddresses = getStorageValue('store')

  return {
    [ChainId.Ethereum]: {
      env: process.env.NPM_ETHEREUM_STORE,
      next: process.env.NEXT_PUBLIC_ETHEREUM_STORE,
      fallback: storeAddresses?.[ChainId.Ethereum]
    },
    [ChainId.Arbitrum]: {
      env: process.env.NPM_ARBITRUM_STORE,
      next: process.env.NEXT_PUBLIC_ARBITRUM_STORE,
      fallback: storeAddresses?.[ChainId.Arbitrum]
    },
    [ChainId.BSC]: {
      env: process.env.NPM_BSC_STORE,
      next: process.env.NEXT_PUBLIC_BSC_STORE,
      fallback: storeAddresses?.[ChainId.BSC]
    },
    [ChainId.BaseGoerli]: {
      env: process.env.NPM_BASE_GOERLI_STORE,
      next: process.env.NEXT_PUBLIC_BASE_GOERLI_STORE,
      fallback: storeAddresses?.[ChainId.BaseGoerli]
    },
    [ChainId.Mumbai]: {
      env: process.env.NPM_MUMBAI_STORE,
      next: process.env.NEXT_PUBLIC_MUMBAI_STORE,
      fallback: storeAddresses?.[ChainId.Mumbai]
    },
    [ChainId.Fuji]: {
      env: process.env.NPM_FUJI_STORE,
      next: process.env.NEXT_PUBLIC_FUJI_STORE,
      fallback: storeAddresses?.[ChainId.Fuji]
    }
  }
}
