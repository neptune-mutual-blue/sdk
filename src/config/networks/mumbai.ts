import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'
import { getStoreAddressFromEnvironment } from '../store'

const wmatic = new Token(ChainId.Mumbai, '0xE8F3118fDB41edcFEF7bF1DCa8009Fa8274aa070', 'Wrapped Matic', 'WMATIC')

class Mumbai implements INetwork {
  chainId: ChainId
  chain: string
  approximateBlockTime: number
  store: string
  uniswap: {
    factory: string | null
    router: string | null
    masterChef: string| null
  }

  tokens: {
    WETH: IToken
  }

  hostname: string

  constructor () {
    this.chainId = ChainId.Mumbai
    this.chain = 'Mumbai Test Network (Polygon)'
    this.approximateBlockTime = 3

    this.store = getStoreAddressFromEnvironment(ChainId.Mumbai)

    this.tokens = {
      WETH: wmatic
    }
    this.uniswap = {
      factory: '0x5757371414417b8C6CAad45bAeF941aBc7d3Ab32',
      router: '0x8954AfA98594b838bda56FE4C12a09D7739D179b',
      masterChef: null
    }
    this.hostname = 'mumbai.neptunemutual.com'
  }
}

export {
  Mumbai
}
