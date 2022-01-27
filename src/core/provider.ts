import { ethers } from 'ethers'
import { ChainId } from '../types'
import { networks } from '../config'

const getReadOnlyProvider = (chainId: ChainId): ethers.providers.Provider => {
  const { rpcProvider } = networks.getChainConfig(chainId)
  return new ethers.providers.JsonRpcProvider(rpcProvider)
}

export { getReadOnlyProvider }
