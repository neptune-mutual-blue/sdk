import { IContractDefinition, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const wbnb = new Token(ChainId.BinanceSmartChainTestnet, '0x094616F0BdFB0b526bD735Bf66Eca0Ad254ca81F', 'Wrapped BNB', 'WBNB')

class BinanceSmartChainTestnet implements IContractDefinition {
  chain: string
  chainId: ChainId
  rpcProvider: string
  store: string

  tokens: {
    WETH: IToken
  }

  constructor () {
    this.chainId = ChainId.BinanceSmartChainTestnet
    this.chain = 'Binance Smart Chain Test Network'
    this.rpcProvider = 'https://data-seed-prebsc-1-s1.binance.org:8545/'
    this.store = '0x22a7944c93f84C9e3B2621a3B02182C1F16548E0'
    this.tokens = {
      WETH: wbnb
    }
  }
}

export { BinanceSmartChainTestnet }
