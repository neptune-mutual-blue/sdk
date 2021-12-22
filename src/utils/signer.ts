import { ethers } from 'ethers'

const getAddress = async (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string | null> => {
  if (signerOrProvider === undefined) {
    return null
  }

  const signer = (signerOrProvider as ethers.Signer)
  return signer.getAddress()
}

export {
  getAddress
}
