import ethers from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { getProtocolContracts } from '../constants/contracts'

const getInstance = (chainId: ChainId, wallet: ethers.Wallet): ethers.Contract => {
  const { COVER } = getProtocolContracts(chainId)

  const contract = new ethers.Contract(COVER, abis.ICover, wallet)
  return contract
}

export {
  getInstance
}
