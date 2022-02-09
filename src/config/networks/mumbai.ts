import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'
import { getNetworkUrlFromEnvironment } from '../rpc'
import { getStoreAddressFromEnvironment } from '../store'

const wmatic = new Token(ChainId.Mumbai, '0xE8F3118fDB41edcFEF7bF1DCa8009Fa8274aa070', 'Wrapped Matic', 'WMATIC')

class Mumbai implements INetwork {
  chainId: ChainId
  chain: string
  approximateBlockTime: number
  rpcProvider: string
  store: string
  uniswap: {
    factory: string | null
    router: string | null
    masterChef: string| null
  }

  tokens: {
    WETH: IToken
  }

  constructor () {
    this.chainId = ChainId.Mumbai
    this.chain = 'Mumbai Test Network (Polygon)'
    this.approximateBlockTime = 3

    this.rpcProvider = getNetworkUrlFromEnvironment(ChainId.Mumbai)
    this.store = getStoreAddressFromEnvironment(ChainId.Mumbai)

    this.tokens = {
      WETH: wmatic
    }
    this.uniswap = {
      factory: null,
      router: null,
      masterChef: null
    }
  }
}

export {
  Mumbai
}
