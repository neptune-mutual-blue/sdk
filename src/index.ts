import * as types from './types'
import * as core from './core'
import * as registry from './registry'
import * as entities from './entities'
import * as config from './config'
import * as utils from './utils'
import * as net from './net'
import * as multicall from './packages/ethers-multicall/src/index'

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

export default sdk
