import { ChainId, IContractDefinition, IProtocolContracts } from '../../types'
import { UnsupportedBlockchainError } from '../../types/Exceptions/UnsupportedBlockchainError'

import { BinanceSmartChain } from './bsc'
import { Mumbai } from './mumbai'

const getProtocolContracts = (chainId: ChainId): IProtocolContracts => {
  switch (chainId) {
    case ChainId.BinanceSmartChain:
      return new BinanceSmartChain().contracts
    case ChainId.Mumbai:
      return new Mumbai().contracts
  }

  return new Mumbai().contracts
}

const getChainConfig = (chainId: ChainId): IContractDefinition => {
  switch (chainId) {
    case ChainId.Mumbai:
      return new Mumbai()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export {
  getChainConfig,
  getProtocolContracts
}
