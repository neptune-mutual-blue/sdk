import { ChainId, INetwork } from '../../types'
import { UnsupportedBlockchainError } from '../../types/Exceptions/UnsupportedBlockchainError'

import { Mumbai } from './mumbai'
import { Fuji } from './fuji'

const TestChainId = [ChainId.Mumbai, ChainId.Fuji]

const getChainConfig = (chainId: ChainId): INetwork => {
  switch (chainId) {
    case ChainId.Mumbai:
      return new Mumbai()
    case ChainId.Fuji:
      return new Fuji()
  }

  throw new UnsupportedBlockchainError(`The ChainId: ${chainId} isn't supported yet`)
}

const isTestChainId = (chain: number) => {
  return !TestChainId.indexOf(chain)
}

export {
  getChainConfig,
  isTestChainId
}
