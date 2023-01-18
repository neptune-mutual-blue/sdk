import {
  ChainId,
  INetwork
} from '../../types'
import {
  UnsupportedBlockchainError
} from '../../types/Exceptions/UnsupportedBlockchainError'
import { Ethereum } from './ethereum'
import { Arbitrum } from './arbitrum'
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
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export { getChainConfig }
