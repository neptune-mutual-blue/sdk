import { ethers } from 'ethers'
import { registry } from '../..'
import { stringify } from '../numbers'

const getPrice = async (pod: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<string> => {
  const vault = await registry.Vault.getInstanceByAddress(pod, signerOrProvider)

  return vault.calculateLiquidity(stringify(amount))
}

export { getPrice }
