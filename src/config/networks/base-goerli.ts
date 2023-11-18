import { Token } from '../../entities/Token.js'
import {
  ChainId,
  type INetwork,
  type IToken
} from '../../types/index.js'
import { getStoreAddressFromEnvironment } from '../store/index.js'

const weth = new Token(ChainId.BaseGoerli, '0x330Eb67E7Cf8aFd2C32109E1628b050472A183fa', 'Wrapped Ether', 'WETH')

class BaseGoerli implements INetwork {
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

  constructor () {
    this.chainId = ChainId.BaseGoerli
    this.chain = 'Base Goerli'
    this.approximateBlockTime = 2

    this.store = getStoreAddressFromEnvironment(ChainId.BaseGoerli)

    this.tokens = {
      WETH: weth
    }
    this.uniswap = {
      factory: '0x8286A48086BEeba59FDe71FFBfA66B005f22D121',
      router: '0x6136dDE4BECBfBd6885d89c61574ED4dCaF16f54',
      masterChef: null
    }
    this.hostname = 'test.neptunemutual.com'
  }
}

export { BaseGoerli }
