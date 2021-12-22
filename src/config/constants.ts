import { toBytes32 } from '../utils/key-util'

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000'

const NS_KEYS = {
  REASSURANCE_VAULT: toBytes32('proto:core:reassurance:vault'),
  BURNER: toBytes32('proto:core:burner'),
  CONTRACTS: toBytes32('proto:contracts'),
  MEMBERS: toBytes32('proto:members'),
  CORE: toBytes32('proto:core'),
  COVER: toBytes32('proto:cover'),
  COVER_REASSURANCE: toBytes32('proto:cover:reassurance'),
  COVER_REASSURANCE_TOKEN: toBytes32('proto:cover:reassurance:token'),
  CLAIMS_PROCESSOR: toBytes32('proto:claims:processor'),
  COVER_CLAIMABLE: toBytes32('proto:cover:claimable'),
  COVER_FEE: toBytes32('proto:cover:fee'),
  COVER_INFO: toBytes32('proto:cover:info'),
  COVER_LIQUIDITY: toBytes32('proto:cover:liquidity'),
  COVER_LIQUIDITY_COMMITTED: toBytes32('proto:cover:liquidity:committed'),
  COVER_LIQUIDITY_NAME: toBytes32('proto:cover:liquidityName'),
  COVER_LIQUIDITY_TOKEN: toBytes32('proto:cover:liquidityToken'),
  COVER_LIQUIDITY_RELEASE_DATE: toBytes32('proto:cover:liquidity:release'),
  COVER_OWNER: toBytes32('proto:cover:owner'),
  COVER_POLICY: toBytes32('proto:cover:policy'),
  COVER_POLICY_ADMIN: toBytes32('proto:cover:policy:admin'),
  COVER_POLICY_RATE_FLOOR: toBytes32('proto:cover:policy:rate:floor'),
  COVER_POLICY_RATE_CEILING: toBytes32('proto:cover:policy:rate:ceiling'),
  COVER_PROVISION: toBytes32('proto:cover:provision'),
  COVER_STAKE: toBytes32('proto:cover:stake'),
  GOVERNANCE: toBytes32('proto:governance'),
  COVER_STAKE_OWNED: toBytes32('proto:cover:stake:owned'),
  COVER_STATUS: toBytes32('proto:cover:status'),
  COVER_VAULT: toBytes32('proto:cover:vault'),
  COVER_CTOKEN: toBytes32('proto:cover:cxToken'),
  TREASURY: toBytes32('proto:core:treasury'),
  SETUP_NPM: toBytes32('proto:setup:npm'),
  SETUP_COVER_FEE: toBytes32('proto:setup:cover:fee'),
  SETUP_MIN_STAKE: toBytes32('proto:setup:min:stake'),
  SETUP_REPORTING_STAKE: toBytes32('proto:setup:reporting:stake'),
  SETUP_MIN_LIQ_PERIOD: toBytes32('proto:setup:min:liq:period'),
  PRICE_DISCOVERY: toBytes32('proto:core:price:discovery'),
  COVER_CTOKEN_FACTORY: toBytes32('proto:cover:cxtoken:factory'),
  COVER_VAULT_FACTORY: toBytes32('proto:cover:vault:factory')
}

export {
  ZERO_ADDRESS,
  ZERO_BYTES32,
  NS_KEYS
}
