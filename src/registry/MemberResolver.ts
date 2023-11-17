import { type Signer } from '@ethersproject/abstract-signer'
import { type Provider } from '@ethersproject/providers'

import { type ChainId } from '../types/index.js'
import * as keyUtil from '../utils/key-util.js'
import { getOrFetch } from './CachedStoreAddress.js'

const findAddress = async (chainId: ChainId, cnsBytes32: string, signerOrProvider: Provider | Signer): Promise<string> => {
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32'], [keyUtil.PROTOCOL.NS.CONTRACTS, cnsBytes32])

  // eslint-disable-next-line @typescript-eslint/return-await
  return getOrFetch(chainId, key, signerOrProvider)
}

export { findAddress }
