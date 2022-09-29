import { IToken } from './IToken'
import { ChainId } from './ChainId'

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
