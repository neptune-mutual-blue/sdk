import { ChainId, INetwork } from '../../types'
import { UnsupportedBlockchainError } from '../../types/Exceptions/UnsupportedBlockchainError'

import { Mumbai } from './mumbai'
import { Fuji } from './fuji'

const getChainConfig = (chainId: ChainId): INetwork => {
  switch (chainId) {
    case ChainId.Mumbai:
      return new Mumbai()
    case ChainId.Fuji:
      return new Fuji()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

export {
  getChainConfig
}
