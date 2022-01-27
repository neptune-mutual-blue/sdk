import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis } from '../config'
import { contract, keyUtil } from '../utils'
import { findAddress } from './MemberResolver'

const getAddress = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return findAddress(chainId, keyUtil.PROTOCOL.CNS.BOND_POOL, signerOrProvider)
}

const getInstance = async (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const address = await getAddress(chainId, signerOrProvider)
  return contract.getContract(chainId, address, abis.IBondPool, signerOrProvider)
}

export {
  getAddress,
  getInstance
}
