import {
  ChainId,
  IToken
} from '../types'

class Token implements IToken {
  chainId: ChainId
  at: string
  name: string
  symbol: string

  constructor (chainId: ChainId, at: string, name: string, symbol: string) {
    this.chainId = chainId
    this.at = at
    this.name = name
    this.symbol = symbol
  }
}

export { Token }
