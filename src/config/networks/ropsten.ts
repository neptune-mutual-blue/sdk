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
    const rpc = process.env.RPC_URL

    if (rpc === null || rpc === undefined) {
      return 'https://ropsten.infura.io/v3/04f673a8619b4e3f89a49232d453f6f2'
    }

    return rpc
  }

  constructor () {
    this.chainId = ChainId.Ropsten
    this.chain = 'Ropsten Test Network'
    this.approximateBlockTime = 12
    this.rpcProvider = this.getNetworkUrl()
    this.store = '0x18EB9D028B569619F2D54388630E4aDf46bF3ddf'

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
