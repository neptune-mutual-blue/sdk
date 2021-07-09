import * as types from './types'
import * as core from './core'
import * as registry from './registry'
import * as entities from './entities'
import * as config from './config'

const { ChainId } = types
const { assurance, cover, policy, cToken, provision, liquidity } = core

const sdk = {
  ChainId,
  assurance,
  cover,
  policy,
  cToken,
  provision,
  liquidity,
  registry,
  types,
  entities,
  config
}

export default sdk
export { sdk }
