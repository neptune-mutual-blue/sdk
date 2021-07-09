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
    this.store = '0xF5746AC00725128cc4f019F25a6c9BA0CD4a2F37'

    this.tokens = {
      WETH: wmatic
    }
  }
}

export {
  Mumbai
}
