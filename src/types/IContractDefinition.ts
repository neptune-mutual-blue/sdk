import { IToken } from './IToken'
import { ChainId } from './ChainId'

interface IContractDefinition {
  chainId: ChainId
  chain: string
  rpcProvider: string
  store: string
  tokens: {
    WETH: IToken
  }
}

export { IContractDefinition }
