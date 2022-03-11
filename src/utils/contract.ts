import { ethers } from 'ethers'

const getContract = (address: string, abi: any[], signerOrProvider: ethers.providers.Provider | ethers.Signer): ethers.Contract => {
  return new ethers.Contract(address, abi, signerOrProvider)
}

export { getContract }
