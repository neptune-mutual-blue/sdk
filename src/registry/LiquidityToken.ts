import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis, constants } from '../config'
import { contract } from '../utils'
import { getOrFetch } from './CachedStoreAddress'

const getAddress = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const { NS_KEYS } = constants
  const address = await getOrFetch(chainId, NS_KEYS.COVER_LIQUIDITY_TOKEN, signerOrProvider)
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
