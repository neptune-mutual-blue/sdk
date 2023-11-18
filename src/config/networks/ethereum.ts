import { Token } from '../../entities/Token.js'
import {
  ChainId,
  type INetwork,
  type IToken
} from '../../types/index.js'
import { getStoreAddressFromEnvironment } from '../store/index.js'

const weth = new Token(ChainId.Ethereum, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 'Wrapped Ether', 'WETH')

class Ethereum implements INetwork {
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
    this.chainId = ChainId.Ethereum
    this.chain = 'Main Ethereum Network'
    this.approximateBlockTime = 12

    this.store = getStoreAddressFromEnvironment(ChainId.Ethereum)

    this.tokens = {
      WETH: weth
    }
    this.uniswap = {
      factory: '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      router: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
      masterChef: null
    }
    this.hostname = 'ethereum.neptunemutual.net'
  }
}

export { Ethereum }
