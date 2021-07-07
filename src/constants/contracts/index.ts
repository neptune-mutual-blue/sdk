import { ChainId, IContractDefinition } from '../../types'
import { UnsupportedBlockchainError } from '../../types/Exceptions/UnsupportedBlockchainError'

import { Mumbai } from './mumbai'

const getChainConfig = (chainId: ChainId): IContractDefinition => {
  switch (chainId) {
    case ChainId.Mumbai:
      return new Mumbai()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export {
  getChainConfig
}
