import {
  ChainId,
  INetwork
} from '../../types'
import {
  UnsupportedBlockchainError
} from '../../types/Exceptions/UnsupportedBlockchainError'
import { Arbitrum } from './arbitrum'
import { BaseGoerli } from './base-goerli'
import { Ethereum } from './ethereum'
import { Fuji } from './fuji'
import { Mumbai } from './mumbai'

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
    case ChainId.BaseGoerli:
      return new BaseGoerli()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export { getChainConfig }
