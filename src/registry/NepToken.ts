import { ethers } from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { getContract } from '../utils/contract'
import { encodeKeys } from '../utils/key'
import { NS_KEYS } from '../constants/values'
import { getOrFetch } from './CachedStoreAddress'

const getInstance = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const key = encodeKeys(['bytes32'], [NS_KEYS.SETUP_NEP])
  const nep = await getOrFetch(chainId, key, signerOrProvider)

  return getContract(chainId, nep, abis.IERC20, signerOrProvider)
}

export {
  getInstance
}
