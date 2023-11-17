import { type ChainId } from './ChainId.js'

interface IToken {
  chainId: ChainId
  at: string
  name: string
  symbol: string
}

export type { IToken }
