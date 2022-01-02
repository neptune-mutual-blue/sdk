import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis, constants } from '../config'
import { contract, keyUtil } from '../utils'
import { getOrFetch } from './CachedStoreAddress'

const getAddress = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const { NS_KEYS, CNS_KEYS } = constants
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32', 'bytes32'], [NS_KEYS.CONTRACTS, CNS_KEYS.COVER_VAULT, coverKey])
  return await getOrFetch(chainId, key, signerOrProvider)
}

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const address = await getAddress(chainId, coverKey, signerOrProvider)
  return contract.getContract(chainId, address, abis.IVault, signerOrProvider)
}

export {
  getAddress,
  getInstance
}
