import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const wmatic = new Token(ChainId.Mumbai, '0xE8F3118fDB41edcFEF7bF1DCa8009Fa8274aa070', 'Wrapped Matic', 'WMATIC')

class Mumbai implements INetwork {
  chainId: ChainId
  chain: string
  approximateBlockTime: number
  rpcProvider: string
  store: string
  uniswap: {
    factory: string | null
    router: string | null
    masterChef: string| null
  }

  tokens: {
    WETH: IToken
  }

  getNetworkUrl (): string {
    const rpc = process.env.NPM_RPC_URL

    if (rpc === null || rpc === undefined) {
      return 'https://rpc-mumbai.maticvigil.com'
    }

    return rpc
  }

  getStore (): string {
    const store = process.env.NPM_STORE

    if (store === null || store === undefined) {
      return '0x4C12AF706A3831Fa23A03733faffED4159842c63'
    }

    return store
  }

  constructor () {
    this.chainId = ChainId.Mumbai
    this.chain = 'Mumbai Test Network (Polygon)'
    this.approximateBlockTime = 3

    this.rpcProvider = this.getNetworkUrl()
    this.store = this.getStore()

    this.tokens = {
      WETH: wmatic
    }
    this.uniswap = {
      factory: null,
      router: null,
      masterChef: null
    }
  }
}

export {
  Mumbai
}
