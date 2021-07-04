import { ChainId } from './ChainId'

interface IToken {
  chainId: ChainId
  at: string
  name: string
  symbol: string
}

export { IToken }
