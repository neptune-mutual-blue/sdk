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
    this.store = '0x4C12AF706A3831Fa23A03733faffED4159842c63'
    this.tokens = {
      WETH: wbnb
    }
  }
}

export { BinanceSmartChainTestnet }
