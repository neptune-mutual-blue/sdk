import { type Signer } from '@ethersproject/abstract-signer'
import { type Contract } from '@ethersproject/contracts'
import { type Provider } from '@ethersproject/providers'

import * as abis from '../config/abis/index.js'
import { type ChainId } from '../types/index.js'
import * as contract from '../utils/contract.js'
import * as keyUtil from '../utils/key-util.js'
import { findAddress } from './MemberResolver.js'

const getAddress = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return findAddress(chainId, keyUtil.PROTOCOL.CNS.COVER_POLICY, signerOrProvider)
}

const getInstance = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<Contract> => {
  const address = await getAddress(chainId, signerOrProvider)
  return contract.getContract(address, abis.IPolicy, signerOrProvider)
}

export { getAddress, getInstance }
