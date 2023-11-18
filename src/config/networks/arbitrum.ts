import { Token } from '../../entities/Token.js'
import {
  ChainId,
  type INetwork,
  type IToken
} from '../../types/index.js'
import { getStoreAddressFromEnvironment } from '../store/index.js'

const weth = new Token(ChainId.Arbitrum, '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1', 'Wrapped Ether', 'WETH')

class Arbitrum implements INetwork {
  chainId: ChainId
  chain: string
  approximateBlockTime: number
  store: string
  uniswap: {
    factory: string | null
    router: string | null
    masterChef: string | null
  }

  tokens: {
    WETH: IToken
  }

  hostname: string

  constructor () {
    this.chainId = ChainId.Arbitrum
    this.chain = 'Arbitrum One Network'
    this.approximateBlockTime = 1

    this.store = getStoreAddressFromEnvironment(ChainId.Arbitrum)

    this.tokens = {
      WETH: weth
    }
    this.uniswap = {
      factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
      router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      masterChef: null
    }
    this.hostname = 'arbitrum.neptunemutual.net'
  }
}

export { Arbitrum }
