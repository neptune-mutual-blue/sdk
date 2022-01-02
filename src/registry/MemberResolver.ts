import { ethers } from 'ethers'
import { ChainId } from '../types'
import { constants } from '../config'
import { keyUtil } from '../utils'
import { getOrFetch } from './CachedStoreAddress'

const findAddress = async (chainId: ChainId, cnsBytes32: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const { NS_KEYS } = constants
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32'], [NS_KEYS.CONTRACTS, cnsBytes32])
  return await getOrFetch(chainId, key, signerOrProvider)
}

export {
  findAddress
}
