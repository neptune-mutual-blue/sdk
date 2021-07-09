import { ethers } from 'ethers'
import { ChainId } from '../types'
import { contracts } from '../config'

const getReadOnlyProvider = (chainId: ChainId): ethers.providers.Provider => {
  const { rpcProvider } = contracts.getChainConfig(chainId)
  return new ethers.providers.JsonRpcProvider(rpcProvider)
}

export { getReadOnlyProvider }
