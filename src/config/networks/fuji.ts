import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'
import { getStoreAddressFromEnvironment } from '../store'

// @todo: Check if the address is correct
const weth = new Token(ChainId.Fuji, '0x80d884a38624dcc3456a5486cb02f6f16415d1ee', 'Wrapped Ether', 'WETH')

class Fuji implements INetwork {
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

  constructor () {
    this.chainId = ChainId.Fuji
    this.chain = 'Fuji Test Network (Avalanche)'
    this.approximateBlockTime = 3

    this.store = getStoreAddressFromEnvironment(ChainId.Fuji)

    this.tokens = {
      WETH: weth
    }
    this.uniswap = {
      factory: null,
      router: null,
      masterChef: null
    }
  }
}

export {
  Fuji
}
