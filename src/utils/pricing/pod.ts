import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Vault } from '../../registry'
import { stringify } from '../numbers'

const getPrice = async (pod: string, amount: number, signerOrProvider: Provider | Signer): Promise<string> => {
  const vault = await Vault.getInstanceByAddress(pod, signerOrProvider)

  return vault.calculateLiquidity(stringify(amount))
}

export { getPrice }
