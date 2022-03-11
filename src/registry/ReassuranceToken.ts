import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis } from '../config'
import { keyUtil, contract } from '../utils'
import { getOrFetch } from './CachedStoreAddress'

const getAddress = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<string> => {
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32'], [keyUtil.PROTOCOL.NS.COVER_REASSURANCE_TOKEN, coverKey])

  // eslint-disable-next-line @typescript-eslint/return-await
  return getOrFetch(chainId, key, signerOrProvider)
}

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<ethers.Contract> => {
  const address = await getAddress(chainId, coverKey, signerOrProvider)
  return contract.getContract(address, abis.IERC20, signerOrProvider)
}

export {
  getAddress,
  getInstance
}
