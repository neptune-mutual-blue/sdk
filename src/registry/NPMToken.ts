import { type Signer } from '@ethersproject/abstract-signer'
import { type Contract } from '@ethersproject/contracts'
import { type Provider } from '@ethersproject/providers'

import * as abis from '../config/abis/index.js'
import { type ChainId } from '../types/index.js'
import * as contract from '../utils/contract.js'
import * as keyUtil from '../utils/key-util.js'
import { getOrFetch } from './CachedStoreAddress.js'

const getAddress = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return getOrFetch(chainId, keyUtil.PROTOCOL.CNS.NPM, signerOrProvider)
}

const getInstance = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<Contract> => {
  const address = await getAddress(chainId, signerOrProvider)
  return contract.getContract(address, abis.IERC20Detailed, signerOrProvider)
}

export { getAddress, getInstance }
