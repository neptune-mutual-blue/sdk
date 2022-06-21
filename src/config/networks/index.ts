import { ChainId, INetwork } from '../../types'
import { UnsupportedBlockchainError } from '../../types/Exceptions/UnsupportedBlockchainError'

import { Mumbai } from './mumbai'
import { BinanceSmartChainTestnet } from './bsc-testnet'
import { Ropsten } from './ropsten'
import { Kovan } from './kovan'
import { Fuji } from './fuji'

const getChainConfig = (chainId: ChainId): INetwork => {
  switch (chainId) {
    case ChainId.Ropsten:
      return new Ropsten()
    case ChainId.Kovan:
      return new Kovan()
    case ChainId.Mumbai:
      return new Mumbai()
    case ChainId.Fuji:
      return new Fuji()
    case ChainId.BinanceSmartChainTestnet:
      return new BinanceSmartChainTestnet()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export {
  getChainConfig
}
