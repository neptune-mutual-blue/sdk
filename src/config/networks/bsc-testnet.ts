import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const wbnb = new Token(ChainId.BinanceSmartChainTestnet, '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F', 'Wrapped BNB', 'WBNB')

class BinanceSmartChainTestnet implements INetwork {
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
    this.chainId = ChainId.BinanceSmartChainTestnet
    this.chain = 'Binance Smart Chain Test Network'
    this.approximateBlockTime = 3
    this.rpcProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    this.store = '0x4C12AF706A3831Fa23A03733faffED4159842c63'
    this.tokens = {
      WETH: wbnb
    }

    this.uniswap = {
      factory: null,
      router: null,
      masterChef: null
    }
  }
}

export { BinanceSmartChainTestnet }
