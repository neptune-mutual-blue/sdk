import { ChainId, IContractDefinition, IProtocolContracts } from '../../types'

import BSC from './bsc'
import Mumbai from './mumbai'

const getProtocolContracts = (chainId: ChainId): IProtocolContracts => {
  switch (chainId) {
    case ChainId.BinanceSmartChain:
      return new BSC().contracts
    case ChainId.Mumbai:
      return new Mumbai().contracts
  }

  return new Mumbai().contracts
}

const getChainConfig = (chainId: ChainId): IContractDefinition => {
  switch (chainId) {
    case ChainId.BinanceSmartChain:
      return new BSC()
    case ChainId.Mumbai:
      return new Mumbai()
  }

  return new Mumbai()
}

export {
  getChainConfig,
  getProtocolContracts
}
