import * as types from './types'
import * as core from './core'
import * as registry from './registry'
import * as entities from './entities'
import * as config from './config'
import * as utils from './utils'

const { ChainId } = types
const { reassurance, cover, policy, cxToken, provision, liquidity, governance, claimsProcessor } = core

const sdk = {
  ChainId,
  reassurance,
  cover,
  policy,
  cxToken,
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
  reassurance,
  cover,
  policy,
  cxToken,
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
