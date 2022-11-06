import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'

import { abis } from '../config'
import * as contract from '../utils/contract'

const getInstance = (tokenAddress: string, signerOrProvider: Provider | Signer): Contract => {
  return contract.getContract(tokenAddress, abis.IERC20Detailed, signerOrProvider)
}

export { getInstance }
