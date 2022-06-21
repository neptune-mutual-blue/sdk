import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { ChainId } from '../types'
import { abis, networks } from '../config'
import { contract } from '../utils'

const getInstance = (chainId: ChainId, signerOrProvider: Provider | Signer): Contract => {
  const { store } = networks.getChainConfig(chainId)
  return contract.getContract(store, abis.IStore, signerOrProvider)
}

export {
  getInstance
}
