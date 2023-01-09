import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'

import {
  abis,
  networks
} from '../config'
import { ChainId } from '../types'
import * as contract from '../utils/contract'

const getInstance = (chainId: ChainId, signerOrProvider: Provider | Signer): Contract => {
  const { store } = networks.getChainConfig(chainId)
  return contract.getContract(store, abis.IStore, signerOrProvider)
}

export { getInstance }
