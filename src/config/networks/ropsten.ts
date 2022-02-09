import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'
import { getNetworkUrlFromEnvironment } from '../rpc'
import { getStoreAddressFromEnvironment } from '../store'

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

  constructor () {
    this.chainId = ChainId.Ropsten
    this.chain = 'Ropsten Test Network'
    this.approximateBlockTime = 12

    this.rpcProvider = getNetworkUrlFromEnvironment(ChainId.Ropsten)
    this.store = getStoreAddressFromEnvironment(ChainId.Ropsten)

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
