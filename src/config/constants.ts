import { toBytes32 } from '../utils/key-util'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'

const CNS_KEYS = {
  CORE: toBytes32('cns:core'),
  BURNER: toBytes32('cns:core:burner'),
  COVER: toBytes32('cns:cover'),
  COVER_REASSURANCE: toBytes32('cns:cover:reassurance'),
  POOL_BOND: toBytes32('cns:pool:bond'),
  COVER_POLICY: toBytes32('cns:cover:policy'),
  COVER_STAKE: toBytes32('cns:cover:stake'),
  COVER_POLICY_ADMIN: toBytes32('cns:cover:policy:admin'),
  COVER_VAULT: toBytes32('cns:cover:vault'),
  COVER_STABLECOIN: toBytes32('cns:cover:stablecoin'),
  COVER_CXTOKEN_FACTORY: toBytes32('cns:cover:cxtoken:factory'),
  COVER_VAULT_FACTORY: toBytes32('cns:cover:vault:factory'),
  GOVERNANCE: toBytes32('cns:gov'),
  RESOLUTION: toBytes32('cns:gov:resolution'),
  CLAIM_PROCESSOR: toBytes32('cns:claim:processor'),
  PRICE_DISCOVERY: toBytes32('cns:core:price:discovery'),
  NPM: toBytes32('cns:core:npm:instance'),
  REASSURANCE_VAULT: toBytes32('cns:core:reassurance:vault'),
  TREASURY: toBytes32('cns:core:treasury'),
  BOND_POOL: toBytes32('cns:pools:bond'),
  STAKING_POOL: toBytes32('cns:pools:staking')
}

const NS_KEYS = {
  CONTRACTS: toBytes32('ns:contracts'),
  COVER_PROVISION: toBytes32('ns:cover:provision'),
  COVER_REASSURANCE_TOKEN: toBytes32('ns:cover:reassurance:token')
}

export {
  ZERO_ADDRESS,
  ZERO_BYTES32,
  NS_KEYS,
  CNS_KEYS
}
