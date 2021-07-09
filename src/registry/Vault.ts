import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis, constants } from '../config'
import { contract, keyUtil } from '../utils'
import { getOrFetch } from './CachedStoreAddress'

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const { NS_KEYS } = constants
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32', 'bytes32'], [NS_KEYS.CONTRACTS, NS_KEYS.COVER_VAULT, coverKey])
  const vault = await getOrFetch(chainId, key, signerOrProvider)

  return contract.getContract(chainId, vault, abis.IVault, signerOrProvider)
}

export {
  getInstance
}
