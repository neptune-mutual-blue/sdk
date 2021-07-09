import { IContractDefinition, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const wbnb = new Token(ChainId.BinanceSmartChain, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 'Wrapped BNB', 'WBNB')

class BinanceSmartChain implements IContractDefinition {
  chain: string
  chainId: ChainId
  rpcProvider: string
  store: string

  tokens: {
    WETH: IToken
  }

  constructor () {
    this.chainId = ChainId.BinanceSmartChain
    this.chain = 'Binance Smart Chain Main Network'
    this.rpcProvider = 'https://bsc-dataseed.binance.org/'
    this.store = ''

    this.tokens = {
      WETH: wbnb
    }
  }
}

export { BinanceSmartChain }
