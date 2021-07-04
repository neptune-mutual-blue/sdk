import { ethers } from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { encodeKeys, toBytes32 } from '../utils/key'
import * as Store from './Store'
import { getContract } from '../utils/contract'

const getInstance = async (chainId: ChainId, coverKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<ethers.Contract> => {
  const NS_ASSURANCE_TOKEN = toBytes32('proto:cover:assurance:token')

  const key = encodeKeys(['bytes32', 'bytes32'], [NS_ASSURANCE_TOKEN, coverKey])
  const vault = await Store.getInstance(chainId, signerOrProvider).getAddress(key)

  return getContract(chainId, vault, abis.IERC20, signerOrProvider)
}

export {
  getInstance
}
