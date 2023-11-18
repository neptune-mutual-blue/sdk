import { type ChainId } from './ChainId.js'
import { type IToken } from './IToken.js'

interface INetwork {
  chainId: ChainId
  chain: string
  approximateBlockTime: number
  store: string
  uniswap: {
    factory: string | null
    router: string | null
    masterChef: string | null
  }
  tokens: {
    WETH: IToken
  }
  hostname: string
}

export type { INetwork }
