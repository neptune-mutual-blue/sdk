import { ChainId, IContractDefinition } from '../../types'
import { UnsupportedBlockchainError } from '../../types/Exceptions/UnsupportedBlockchainError'

import { Mumbai } from './mumbai'
import { BinanceSmartChainTestnet } from './bsc-testnet'
import { Ropsten } from './ropsten'

const getChainConfig = (chainId: ChainId): IContractDefinition => {
  switch (chainId) {
    case ChainId.Ropsten:
      return new Ropsten()
    case ChainId.Mumbai:
      return new Mumbai()
    case ChainId.BinanceSmartChainTestnet:
      return new BinanceSmartChainTestnet()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export {
  getChainConfig
}
