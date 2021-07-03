import { ChainId } from './ChainId'

export default interface IToken {
  chainId: ChainId
  at: string
  name: string
  symbol: string
}
