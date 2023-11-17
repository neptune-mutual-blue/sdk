import { type Signer } from '@ethersproject/abstract-signer'
import { type Contract } from '@ethersproject/contracts'
import { type Provider } from '@ethersproject/providers'

import {
  abis,
  networks
} from '../config/index.js'
import { type ChainId } from '../types/index.js'
import * as contract from '../utils/contract.js'

const getInstance = (chainId: ChainId, signerOrProvider: Provider | Signer): Contract => {
  const { store } = networks.getChainConfig(chainId)
  return contract.getContract(store, abis.IStore, signerOrProvider)
}

export { getInstance }
