import { IContractDefinition, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const nep = new Token(ChainId.Mumbai, '0xF11A6389d633b0231314101e5BccCbdE8588b273', 'Neptune Mutual Token', 'NEP')
const wmatic = new Token(ChainId.Mumbai, '0xE8F3118fDB41edcFEF7bF1DCa8009Fa8274aa070', 'Wrapped Matic', 'WMATIC')
const dai = new Token(ChainId.Mumbai, '0x43390Ae224F6741c35C19B15734EEf3f3Dab9cA0', 'Dai Stablecoin', 'DAI')

class Mumbai implements IContractDefinition {
  chain: string
  chainId: ChainId
  rpcProvider: string
  contracts: {
    PROTOCOL: string
    STORE: string
    CTOKEN_FACTORY: string
    COVER: string
    COVER_PROVISION: string
    COVER_STAKE: string
    COVER_ASSURANCE: string
    PRICE_DISCOVERY: string
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
    this.chain = 'Mumbai Test Network (Polygon)'
    this.rpcProvider = 'https://rpc-mumbai.maticvigil.com'
    this.chainId = ChainId.Mumbai

    this.contracts = {
      PROTOCOL: '0x2E6dC55A38d394915adc0e671673290Ec2F35425',
      STORE: '0x2E6dC55A38d394915adc0e671673290Ec2F35425',
      CTOKEN_FACTORY: '0x9c068E5fB28Ea9DE9879f7565Aa81eD0A24342F4',
      COVER: '0xacDA6a9F6A366C2218d8F82C9928B533f343Ae22',
      COVER_PROVISION: '0x937fb2d900549d96037f747ca46B934EAeE44f60',
      COVER_STAKE: '0xAAc88E408E3e15A1F9BF28566c53562cfc3B4801',
      COVER_ASSURANCE: '0x5eA6723dC83245910134DEb8ee4fDd3fdd62C486',
      PRICE_DISCOVERY: '0x597B15eAF1eC234b59D9401878Db6bC07f72D913',
      POLICY: '0x40250728E029B34602Df9B258Fe485f2C8653822',
      POLICY_MANAGER: '',
      POLICY_ADMIN: '0x75F2a03C1c665f788690EF0E89aD3EA5066C06D9',
      VAULT_FACTORY: '0x8B593Ab53786A89bd2f85aE167bC9967BE789279'
    }

    this.tokens = {
      NEP: nep,
      WETH: wmatic,
      STABLECOIN: dai
    }
  }
}

export {
  Mumbai
}
