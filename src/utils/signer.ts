import { ethers } from 'ethers'
import { logError } from './logger'

const getAddress = async (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string | null> => {
  if (signerOrProvider === undefined) {
    return null
  }

  try {
    const signer = (signerOrProvider as ethers.Signer)
    return await signer.getAddress()
  } catch (error) {
    logError('The provider is not a signer', error.message)
  }

  return null
}

export {
  getAddress
}
