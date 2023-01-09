import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/providers'

import * as Vault from '../../registry/Vault'
import { stringify } from '../numbers'

const getPrice = async (pod: string, amount: number, signerOrProvider: Provider | Signer): Promise<string> => {
  const vault = await Vault.getInstanceByAddress(pod, signerOrProvider)

  return vault.calculateLiquidity(stringify(amount))
}

export { getPrice }
