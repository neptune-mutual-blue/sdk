import { ChainId } from './ChainId'
import { IToken } from './IToken'

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

export { INetwork }
