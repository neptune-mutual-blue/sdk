import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'
import { getNetworkUrlFromEnvironment } from '../rpc'
import { getStoreAddressFromEnvironment } from '../store'

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

    this.rpcProvider = getNetworkUrlFromEnvironment(ChainId.BinanceSmartChainTestnet)
    this.store = getStoreAddressFromEnvironment(ChainId.BinanceSmartChainTestnet)

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
