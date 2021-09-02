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
    this.chain = 'Binance Smart Chain Main Network'
    this.rpcProvider = 'https://bsc-dataseed.binance.org/'
    this.store = '0x6e6b8163Ce003821925d706a181f09F22795B6E7'

    this.tokens = {
      WETH: wbnb
    }
  }
}

export { BinanceSmartChainTestnet }
