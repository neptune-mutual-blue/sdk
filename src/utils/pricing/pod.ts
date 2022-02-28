import { ethers } from 'ethers'
import { registry } from '../..'
import { ChainId } from '../../types'

const getPrice = async (chainId: ChainId, pod: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<number> => {
  const vault = await registry.Vault.getInstanceByAddress(chainId, pod, signerOrProvider)

  return vault.calculateLiquidity(amount)
}

export { getPrice }
