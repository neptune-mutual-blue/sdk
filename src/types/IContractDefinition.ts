import IToken from './IToken'
import IProtocolContracts from './IProtocolContracts'
import { ChainId } from './ChainId'

export default interface IContractDefinition {
  chainId: ChainId
  chain: string
  rpcProvider: string
  contracts: IProtocolContracts
  tokens: {
    NEP: IToken
    WETH: IToken
    STABLECOIN: IToken
  }
}
