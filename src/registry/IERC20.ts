import { ethers } from 'ethers'
import { ChainId } from '..'
import * as abis from '../constants/abis'
import { getContract } from '../utils/contract'

const getInstance = (chainId: ChainId, tokenAddress: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): ethers.Contract => {
  return getContract(chainId, tokenAddress, abis.IERC20, signerOrProvider)
}

export {
  getInstance
}
