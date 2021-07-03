import ethers from 'ethers'
import * as abis from '../constants/abis'

const getInstance = (tokenAddress: string, wallet: ethers.Wallet): ethers.Contract => {
  return new ethers.Contract(tokenAddress, abis.IERC20, wallet)
}

export {
  getInstance
}
