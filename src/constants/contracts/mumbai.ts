import { IContractDefinition, IToken, ChainId } from '../../types'
import { Token } from '../../entities/Token'

const nep = new Token(ChainId.Mumbai, '0xaa6E152DCF34F54aCa65d5c4a720763e347F42d4', 'Neptune Mutual Token', 'NEP')
const wmatic = new Token(ChainId.Mumbai, '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c', 'Wrapped Matic', 'WMATIC')
const dai = new Token(ChainId.Mumbai, '0x62E329214173E1C50A7Aee8DC2Ca5e04af6D6B6f', 'Dai Stablecoin', 'DAI')

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
      PROTOCOL: '0x55e1e99f11bD38734F11C49baC19d8c991A25284',
      STORE: '0xa2F6d0BE6858267702556406045eEC4E2393aeFA',
      CTOKEN_FACTORY: '0xfD3c57f9DF7Da89d29005d30cF994B8fB567D9af',
      COVER: '0x71698490A88f937E0ef7ED2cc01A58f98DE5Fc9C',
      COVER_PROVISION: '0x600671dd1A5D0A52B072548D5D6fE825a12258D5',
      COVER_STAKE: '0x9147A5cb1F858A8dC5Ca2C26EC929E6EC38BAc32',
      COVER_ASSURANCE: '0x6fB2eAf0b7770087314df3Cb73C34B510C2c2354',
      PRICE_DISCOVERY: '0x461679CE02C83bF71D0D926E694ab274380C4f9d',
      POLICY: '0x5cd9258dE0B2cF35DAca10FbfAA5c0c99805C25E',
      POLICY_MANAGER: '',
      POLICY_ADMIN: '0xd7F5dcb12b537Ae1c1171DCD40C3F53AC21a4B13',
      VAULT_FACTORY: '0xc0b620B8213496B9538F0764b12162C6B56C3058'
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
