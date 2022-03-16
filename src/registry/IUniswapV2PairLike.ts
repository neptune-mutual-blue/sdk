import { ethers } from 'ethers'
import { abis } from '../config'
import { contract } from '../utils'

const getInstance = async (fromAddress: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<ethers.Contract> => {
  return contract.getContract(fromAddress, abis.IUniswapV2PairLike, signerOrProvider)
}

export {
  getInstance
}
