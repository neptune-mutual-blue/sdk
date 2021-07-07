import { ethers } from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { getChainConfig } from '../constants/contracts'
import { getContract } from '../utils/contract'

const getInstance = (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): ethers.Contract => {
  const { store } = getChainConfig(chainId)

  const contract = getContract(chainId, store, abis.IStore, signerOrProvider)
  return contract
}

export {
  getInstance
}
