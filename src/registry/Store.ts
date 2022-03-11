import { ethers } from 'ethers'
import { ChainId } from '../types'
import { abis, networks } from '../config'
import { contract } from '../utils'

const getInstance = (chainId: ChainId, signerOrProvider: ethers.providers.Provider | ethers.Signer): ethers.Contract => {
  const { store } = networks.getChainConfig(chainId)
  return contract.getContract(store, abis.IStore, signerOrProvider)
}

export {
  getInstance
}
