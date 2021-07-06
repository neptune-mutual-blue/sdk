import { ethers } from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { getProtocolContracts } from '../constants/contracts'
import { getContract } from '../utils/contract'

const getInstance = (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): ethers.Contract => {
  const { POLICY } = getProtocolContracts(chainId)
  return getContract(chainId, POLICY, abis.IPolicy, signerOrProvider)
}

export {
  getInstance
}
