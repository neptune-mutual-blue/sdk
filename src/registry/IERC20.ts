import { type Signer } from '@ethersproject/abstract-signer'
import { type Contract } from '@ethersproject/contracts'
import { type Provider } from '@ethersproject/providers'

import * as abis from '../config/abis/index.js'
import * as contract from '../utils/contract.js'

const getInstance = (tokenAddress: string, signerOrProvider: Provider | Signer): Contract => {
  return contract.getContract(tokenAddress, abis.IERC20Detailed, signerOrProvider)
}

export { getInstance }
