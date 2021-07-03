import ethers from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { getProtocolContracts } from '../constants/contracts'

const getInstance = (chainId: ChainId, wallet: ethers.Wallet): ethers.Contract => {
  const { COVER_ASSURANCE } = getProtocolContracts(chainId)
  return new ethers.Contract(COVER_ASSURANCE, abis.ICoverAssurance, wallet)
}

export {
  getInstance
}
