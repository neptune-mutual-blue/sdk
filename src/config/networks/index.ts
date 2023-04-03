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

const configs = {
  [ChainId.Ethereum]: new Ethereum(),
  [ChainId.Arbitrum]: new Arbitrum(),
  [ChainId.BaseGoerli]: new BaseGoerli(),
  [ChainId.Mumbai]: new Mumbai(),
  [ChainId.Fuji]: new Fuji(),
  [ChainId.Invalid]: null
}

const getChainConfig = (chainId: ChainId): INetwork => {
  const config = configs[chainId]

  if (config !== undefined || config !== null) {
    return config as INetwork
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export { getChainConfig }
