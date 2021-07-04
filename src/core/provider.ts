import { ethers } from 'ethers'
import { ChainId } from '../types'
import { getChainConfig } from '../constants/contracts'

const getReadOnlyProvider = (chainId: ChainId): ethers.providers.Provider => {
  const { rpcProvider } = getChainConfig(chainId)
  return new ethers.providers.JsonRpcProvider(rpcProvider)
}

export { getReadOnlyProvider }
