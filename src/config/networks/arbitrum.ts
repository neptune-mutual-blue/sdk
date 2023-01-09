import { Token } from '../../entities/Token'
import {
  ChainId,
  INetwork,
  IToken
} from '../../types'
import { getStoreAddressFromEnvironment } from '../store'

const weth = new Token(ChainId.Arbitrum, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 'Wrapped Ether', 'WETH')

class Arbitrum implements INetwork {
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
    this.chainId = ChainId.Arbitrum
    this.chain = 'Arbitrum One Network'
    this.approximateBlockTime = 12

    this.store = getStoreAddressFromEnvironment(ChainId.Arbitrum)

    this.tokens = {
      WETH: weth
    }
    this.uniswap = {
      factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      masterChef: null
    }
    this.hostname = 'arbitrum.neptunemutual.com'
  }
}

export { Arbitrum }
