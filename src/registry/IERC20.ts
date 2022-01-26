import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis } from '../config'
import { contract } from '../utils'

const getInstance = (chainId: ChainId, tokenAddress: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): ethers.Contract => {
  return contract.getContract(chainId, tokenAddress, abis.IERC20Detailed, signerOrProvider)
}

export {
  getInstance
}
