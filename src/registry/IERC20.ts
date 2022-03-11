import { ethers } from 'ethers'
import { abis } from '../config'
import { contract } from '../utils'

const getInstance = (tokenAddress: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): ethers.Contract => {
  return contract.getContract(tokenAddress, abis.IERC20Detailed, signerOrProvider)
}

export {
  getInstance
}
