import { Token } from '../../entities/Token'
import {
  ChainId,
  INetwork,
  IToken
} from '../../types'
import { getStoreAddressFromEnvironment } from '../store'

const weth = new Token(ChainId.BaseGoerli, '0x44D627f900da8AdaC7561bD73aA745F132450798', 'Wrapped Ether', 'WETH')

class BaseGoerli implements INetwork {
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
    this.chainId = ChainId.BaseGoerli
    this.chain = 'Base Goerli'
    this.approximateBlockTime = 2

    this.store = getStoreAddressFromEnvironment(ChainId.BaseGoerli)

    this.tokens = {
      WETH: weth
    }
    this.uniswap = {
      factory: '0x352f2178BD6F1960d53e6c10CD1538AB4D97705B',
      router: '0x9D39851E176f3d9431EBcf4F4F87c5fE74435537',
      masterChef: null
    }
    this.hostname = 'test.neptunemutual.com'
  }
}

export { BaseGoerli }
