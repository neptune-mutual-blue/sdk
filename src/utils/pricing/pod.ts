import { type Signer } from '@ethersproject/abstract-signer'
import { type Provider } from '@ethersproject/providers'

import * as Vault from '../../registry/Vault.js'
import { stringify } from '../numbers.js'

const getPrice = async (pod: string, amount: number, signerOrProvider: Provider | Signer): Promise<string> => {
  const vault = await Vault.getInstanceByAddress(pod, signerOrProvider)

  return vault.calculateLiquidity(stringify(amount))
}

export { getPrice }
