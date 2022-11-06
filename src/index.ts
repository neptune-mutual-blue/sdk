import * as config from './config'
import * as core from './core'
import * as entities from './entities'
import * as net from './net'
import * as multicall from './packages/ethers-multicall/src/index'
import * as registry from './registry'
import * as types from './types'
import * as utils from './utils'

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
