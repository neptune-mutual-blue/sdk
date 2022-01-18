import { ethers } from 'ethers'
import { ChainId } from '../types'
import { keyUtil } from '../utils'
import { getOrFetch } from './CachedStoreAddress'

const findAddress = async (chainId: ChainId, cnsBytes32: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32'], [keyUtil.PROTOCOL.NS.CONTRACTS, cnsBytes32])

  // eslint-disable-next-line @typescript-eslint/return-await
  return getOrFetch(chainId, key, signerOrProvider)
}

export {
  findAddress
}
