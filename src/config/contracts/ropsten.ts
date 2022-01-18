import { IContractDefinition, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const weth = new Token(ChainId.Ropsten, '0xc778417E063141139Fce010982780140Aa0cD5Ab', 'Wrapped ETH', 'WETH')

class Ropsten implements IContractDefinition {
  chainId: ChainId
  chain: string
  rpcProvider: string
  store: string
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
    this.rpcProvider = this.getNetworkUrl()
    this.store = '0x50D55e4Fe66295e84aC03462D2b5b98215cfC386'

    this.tokens = {
      WETH: weth
    }
  }
}

export {
  Ropsten
}
