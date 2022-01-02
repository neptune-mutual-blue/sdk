import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis, constants } from '../config'
import { contract } from '../utils'
import { findAddress } from './MemberResolver'

const getAddress = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const { CNS_KEYS } = constants
  return await findAddress(chainId, CNS_KEYS.COVER_REASSURANCE, signerOrProvider)
}

const getInstance = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const address = await getAddress(chainId, signerOrProvider)
  return contract.getContract(chainId, address, abis.ICoverReassurance, signerOrProvider)
}

export {
  getAddress,
  getInstance
}
