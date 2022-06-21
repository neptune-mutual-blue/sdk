import { INetwork, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'
import { getStoreAddressFromEnvironment } from '../store'

const weth = new Token(ChainId.Fuji, '0xD9D01A9F7C810EC035C0e42cB9E80Ef44D7f8692', 'Wrapped AVAX', 'WAVAX')

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
      factory: '0xe4a575550c2b460d2307b82dcd7afe84ad1484dd',
      router: '0x2D99ABD9008Dc933ff5c0CD271B88309593aB921',
      masterChef: null
    }
  }
}

export {
  Fuji
}
