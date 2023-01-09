import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'

import { abis } from '../config'
import { ChainId } from '../types'
import * as contract from '../utils/contract'
import * as keyUtil from '../utils/key-util'
import { getOrFetch } from './CachedStoreAddress'

const getAddress = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return getOrFetch(chainId, keyUtil.PROTOCOL.CNS.UNISWAP_V2_ROUTER, signerOrProvider)
}

const getInstance = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<Contract> => {
  const address = await getAddress(chainId, signerOrProvider)
  return contract.getContract(address, abis.IUniswapV2RouterLike, signerOrProvider)
}

export { getAddress, getInstance }
