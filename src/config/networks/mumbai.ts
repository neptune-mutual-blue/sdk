import { Token } from '../../entities/Token'
import {
  ChainId,
  INetwork,
  IToken
} from '../../types'
import { getStoreAddressFromEnvironment } from '../store'

const wmatic = new Token(ChainId.Mumbai, '0xaf75BBD137e6f2dc92668a89b1a6d0E70B03da10', 'Wrapped Matic', 'WMATIC')

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
      factory: '0xa22ac46e83Be5c2B947B604A85fF52DB0a0E01e8',
      router: '0x0AEb349be52A1F95395AC0Fa8dCC63b17A492D6d',
      masterChef: null
    }
    this.hostname = 'mumbai.neptunemutual.com'
  }
}

export { Mumbai }
