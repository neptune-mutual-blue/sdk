import { IContractDefinition, IToken, ChainId } from '../../types'

import Token from '../../entities/Token'

const nep = new Token(ChainId.BinanceSmartChain, '0xcE3805A443eBb27B2A4058eC9d94dC4f9C000633', 'Neptune Mutual Token', 'NEP')
const wbnb = new Token(ChainId.BinanceSmartChain, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 'Wrapped BNB', 'WBNB')
const busd = new Token(ChainId.BinanceSmartChain, '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56', 'Binance USD', 'BUSD')

export default class BinanceSmartChain implements IContractDefinition {
  chain: string
  chainId: ChainId
  rpcProvider: string
  contracts: {
    PROTOCOL: string
    STORE: string
    CTOKEN_FACTORY: string
    COVER: string
    COVER_PROVISION: string
    PRICE_DISCOVERY: string
    COVER_STAKE: string
    COVER_ASSURANCE: string
    POLICY: string
    POLICY_MANAGER: string
    POLICY_ADMIN: string
    VAULT_FACTORY: string
  }

  tokens: {
    NEP: IToken
    WETH: IToken
    STABLECOIN: IToken
  }

  constructor () {
    this.chain = 'Binance Smart Chain Main Network'
    this.chainId = ChainId.BinanceSmartChain
    this.rpcProvider = 'https://bsc-dataseed.binance.org/'

    this.contracts = {
      PROTOCOL: '',
      STORE: '',
      PRICE_DISCOVERY: '',
      CTOKEN_FACTORY: '',
      COVER: '',
      COVER_PROVISION: '',
      COVER_STAKE: '',
      COVER_ASSURANCE: '',
      POLICY: '',
      POLICY_ADMIN: '',
      POLICY_MANAGER: '',
      VAULT_FACTORY: ''
    }

    this.tokens = {
      NEP: nep,
      WETH: wbnb,
      STABLECOIN: busd
    }
  }
}
