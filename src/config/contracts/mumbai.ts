import { IContractDefinition, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const wmatic = new Token(ChainId.Mumbai, '0xE8F3118fDB41edcFEF7bF1DCa8009Fa8274aa070', 'Wrapped Matic', 'WMATIC')

class Mumbai implements IContractDefinition {
  chainId: ChainId
  chain: string
  rpcProvider: string
  store: string
  tokens: {
    WETH: IToken
  }

  constructor () {
    this.chainId = ChainId.Mumbai
    this.chain = 'Mumbai Test Network (Polygon)'
    this.rpcProvider = 'https://rpc-mumbai.maticvigil.com'
    this.store = '0x4C12AF706A3831Fa23A03733faffED4159842c63'

    this.tokens = {
      WETH: wmatic
    }
  }
}

export {
  Mumbai
}
