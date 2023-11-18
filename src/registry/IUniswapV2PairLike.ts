import { type Signer } from '@ethersproject/abstract-signer'
import { type Contract } from '@ethersproject/contracts'
import { type Provider } from '@ethersproject/providers'

import * as abis from '../config/abis/index.js'
import * as contract from '../utils/contract.js'

const getInstance = async (fromAddress: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  return contract.getContract(fromAddress, abis.IUniswapV2PairLike, signerOrProvider)
}

export { getInstance }
