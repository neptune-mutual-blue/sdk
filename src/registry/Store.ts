import ethers from 'ethers'
import { ChainId } from '../types'
import * as abis from '../constants/abis'
import { getProtocolContracts } from '../constants/contracts'

const getInstance = (chainId: ChainId, wallet: ethers.Wallet): ethers.Contract => {
  const { STORE } = getProtocolContracts(chainId)

  const contract = new ethers.Contract(STORE, abis.IStore, wallet)
  return contract
}

export {
  getInstance
}
