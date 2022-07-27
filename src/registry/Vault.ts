import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { ChainId } from '../types'
import { abis } from '../config'
import * as contract from '../utils/contract'
import * as keyUtil from '../utils/key-util'
import { getOrFetch } from './CachedStoreAddress'

const getAddress = async (chainId: ChainId, coverKey: string, signerOrProvider: Provider | Signer): Promise<string> => {
  const key = keyUtil.encodeKeys(['bytes32', 'bytes32', 'bytes32'], [keyUtil.PROTOCOL.NS.CONTRACTS, keyUtil.PROTOCOL.CNS.COVER_VAULT, coverKey])

  // eslint-disable-next-line @typescript-eslint/return-await
  return getOrFetch(chainId, key, signerOrProvider)
}

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  const address = await getAddress(chainId, coverKey, signerOrProvider)
  return contract.getContract(address, abis.IVault, signerOrProvider)
}

const getInstanceByAddress = async (address: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  return contract.getContract(address, abis.IVault, signerOrProvider)
}

export {
  getAddress,
  getInstance,
  getInstanceByAddress
}
