import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis } from '../config'
import { contract } from '../utils'

const getInstance = async (chainId: ChainId, fromAddress: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  return contract.getContract(chainId, fromAddress, abis.IUniswapV2RouterLike, signerOrProvider)
}

export {
  getInstance
}
