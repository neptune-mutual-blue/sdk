import * as config from './config/index.js'
import * as core from './core/index.js'
import * as entities from './entities/index.js'
import * as net from './net/index.js'
import * as multicall from './packages/ethers-multicall/src/index.js'
import * as registry from './registry/index.js'
import * as types from './types/index.js'
import * as utils from './utils/index.js'

const { ChainId } = types
const { reassurance, cover, policy, cxToken, liquidity, governance, resolution, claimsProcessor } = core

const sdk = {
  ChainId,
  reassurance,
  cover,
  policy,
  cxToken,
  liquidity,
  registry,
  governance,
  resolution,
  claimsProcessor,
  types,
  entities,
  config,
  utils,
  net,
  multicall
}

export {
  ChainId,
  claimsProcessor,
  config,
  cover,
  cxToken,
  entities,
  governance,
  liquidity,
  multicall,
  net,
  policy,
  reassurance,
  registry,
  resolution,
  types,
  utils
}

export default sdk
