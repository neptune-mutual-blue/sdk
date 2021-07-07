import { ethers } from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { encodeKeys } from '../utils/key'
import { getContract } from '../utils/contract'
import { NS_KEYS } from '../constants/values'
import { getOrFetch } from './CachedStoreAddress'

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const key = encodeKeys(['bytes32', 'bytes32'], [NS_KEYS.COVER_ASSURANCE_TOKEN, coverKey])
  const vault = await getOrFetch(chainId, key, signerOrProvider)

  return getContract(chainId, vault, abis.IERC20, signerOrProvider)
}

export {
  getInstance
}
