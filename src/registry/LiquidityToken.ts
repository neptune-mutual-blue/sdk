import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis, constants } from '../config'
import { contract, keyUtil } from '../utils'
import { getOrFetch } from './CachedStoreAddress'

const getAddress = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const { NS_KEYS } = constants
  const key = keyUtil.encodeKeys(['bytes32'], [NS_KEYS.COVER_LIQUIDITY_TOKEN])
  const address = await getOrFetch(chainId, key, signerOrProvider)
  return address
}

const getInstance = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const address = await getAddress(chainId, signerOrProvider)
  return contract.getContract(chainId, address, abis.IERC20, signerOrProvider)
}

export {
  getAddress,
  getInstance
}
