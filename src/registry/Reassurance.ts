import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'

import { abis } from '../config'
import { ChainId } from '../types'
import * as contract from '../utils/contract'
import * as keyUtil from '../utils/key-util'
import { findAddress } from './MemberResolver'

const getAddress = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return findAddress(chainId, keyUtil.PROTOCOL.CNS.COVER_REASSURANCE, signerOrProvider)
}

const getInstance = async (chainId: ChainId, signerOrProvider: Provider | Signer): Promise<Contract> => {
  const address = await getAddress(chainId, signerOrProvider)
  return contract.getContract(address, abis.ICoverReassurance, signerOrProvider)
}

export { getAddress, getInstance }
