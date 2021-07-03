import ethers from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { encodeKeys, toBytes32 } from '../utils/key'
import * as Store from './Store'

const getInstance = async (chainId: ChainId, coverKey: string, wallet: ethers.Wallet): Promise<ethers.Contract> => {
  const NS_ASSURANCE_TOKEN = toBytes32('proto:cover:assurance:token')

  const key = encodeKeys(['bytes32', 'bytes32'], [NS_ASSURANCE_TOKEN, coverKey])
  const vault = await Store.getInstance(chainId, wallet).getAddress(key)

  return new ethers.Contract(vault, abis.IERC20, wallet)
}

export {
  getInstance
}
