import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const weth = new Token(ChainId.Ropsten, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 'Wrapped ETH', 'WETH')

class Ropsten implements INetwork {
  chainId: ChainId
  chain: string
  approximateBlockTime: number
  rpcProvider: string
  store: string
  uniswap: {
    factory: string
    router: string
    masterChef: string
  }

  tokens: {
    WETH: IToken
  }

  getNetworkUrl (): string {
    const rpc = process.env.NPM_RPC_URL

    if (rpc === null || rpc === undefined) {
      return 'https://ropsten.infura.io/v3/04f673a8619b4e3f89a49232d453f6f2'
    }

    return rpc
  }

  getStore (): string {
    const store = process.env.NPM_STORE

    if (store === null || store === undefined) {
      return '0x298F3f87d9d29bE80639c0ed603dc283d7D0c31f'
    }

    return store
  }

  constructor () {
    this.chainId = ChainId.Ropsten
    this.chain = 'Ropsten Test Network'
    this.approximateBlockTime = 12

    this.rpcProvider = this.getNetworkUrl()
    this.store = this.getStore()

    this.tokens = {
      WETH: weth
    }

    this.uniswap = {
      factory: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
      router: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
      masterChef: '0x80C7DD17B01855a6D2347444a0FCC36136a314de'
    }
  }
}

export {
  Ropsten
}
