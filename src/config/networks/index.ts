import {
  UnsupportedBlockchainError
} from '../../types/Exceptions/UnsupportedBlockchainError.js'
import {
  ChainId,
  type INetwork
} from '../../types/index.js'
import { Arbitrum } from './arbitrum.js'
import { BaseGoerli } from './base-goerli.js'
import { BSC } from './bsc.js'
import { Ethereum } from './ethereum.js'
import { Fuji } from './fuji.js'
import { Mumbai } from './mumbai.js'

const getChainConfig = (chainId: ChainId): INetwork => {
  switch (chainId) {
    case ChainId.Ethereum:
      return new Ethereum()
    case ChainId.Mumbai:
      return new Mumbai()
    case ChainId.Fuji:
      return new Fuji()
    case ChainId.Arbitrum:
      return new Arbitrum()
    case ChainId.BSC:
      return new BSC()
    case ChainId.BaseGoerli:
      return new BaseGoerli()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export { getChainConfig }
