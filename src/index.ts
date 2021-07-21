import * as types from './types'
import * as core from './core'
import * as registry from './registry'
import * as entities from './entities'
import * as config from './config'
import * as utils from './utils'

const { ChainId } = types
const { assurance, cover, policy, cToken, provision, liquidity, governance, claimsProcessor } = core

const sdk = {
  ChainId,
  assurance,
  cover,
  policy,
  cToken,
  provision,
  liquidity,
  registry,
  governance,
  claimsProcessor,
  types,
  entities,
  config,
  utils
}

export {
  ChainId,
  assurance,
  cover,
  policy,
  cToken,
  provision,
  liquidity,
  registry,
  governance,
  claimsProcessor,
  types,
  entities,
  config,
  utils
}

export default sdk
