import { ethers } from 'ethers'
import { ChainId } from '../types'
import { getReadOnlyProvider } from '../core/provider'

const getContract = (chainId: ChainId, address: string, abi: any[], signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): ethers.Contract => {
  const provider = signerOrProvider === undefined ? getReadOnlyProvider(chainId) : signerOrProvider
  return new ethers.Contract(address, abi, provider)
}

export { getContract }
