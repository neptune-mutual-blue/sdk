import { ethers } from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { getProtocolContracts } from '../constants/contracts'
import { getContract } from '../utils/contract'

const getInstance = (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): ethers.Contract => {
  const { COVER } = getProtocolContracts(chainId)

  const contract = getContract(chainId, COVER, abis.ICover, signerOrProvider)
  return contract
}

export {
  getInstance
}
