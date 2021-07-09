import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis, constants } from '../config'
import { encodeKeys } from '../utils/key-util'
import { getContract } from '../utils/contract'
import { getOrFetch } from './CachedStoreAddress'

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const { NS_KEYS } = constants
  const key = encodeKeys(['bytes32', 'bytes32'], [NS_KEYS.COVER_ASSURANCE_TOKEN, coverKey])
  const vault = await getOrFetch(chainId, key, signerOrProvider)

  return getContract(chainId, vault, abis.IERC20, signerOrProvider)
}

export {
  getInstance
}
