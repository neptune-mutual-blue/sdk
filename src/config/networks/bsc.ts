import { Token } from '../../entities/Token'
import {
  ChainId,
  INetwork,
  IToken
} from '../../types'
import { getStoreAddressFromEnvironment } from '../store'

const weth = new Token(ChainId.BSC, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 'Wrapped Ether', 'WETH')

class BSC implements INetwork {
  chainId: ChainId
  chain: string
  approximateBlockTime: number
  store: string
  uniswap: {
    factory: string | null
    router: string | null
    masterChef: string| null
  }

  tokens: {
    WETH: IToken
  }

  hostname: string

  constructor () {
    this.chainId = ChainId.BSC
    this.chain = 'BNB Smart Chain'
    this.approximateBlockTime = 2

    this.store = getStoreAddressFromEnvironment(ChainId.BSC)

    this.tokens = {
      WETH: weth
    }
    this.uniswap = {
      factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
      router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
      masterChef: null
    }
    this.hostname = 'bsc.neptunemutual.net'
  }
}

export { BSC }
