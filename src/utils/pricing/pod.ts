import { ethers } from 'ethers'
import { registry } from '../..'
import { ChainId } from '../../types'
import { stringify } from '../numbers'

const getPrice = async (chainId: ChainId, pod: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string> => {
  const vault = await registry.Vault.getInstanceByAddress(chainId, pod, signerOrProvider)

  return vault.calculateLiquidity(stringify(amount))
}

export { getPrice }
