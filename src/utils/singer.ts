import { ethers } from 'ethers'

const getAddress = async (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string | null> => {
  if (signerOrProvider === undefined) {
    return null
  }

  try {
    const signer = (signerOrProvider as ethers.Signer)
    return await signer.getAddress()
  } catch (error) {
    console.error(error.message)

    console.error('The provider is not a signer')
  }

  return null
}

export {
  getAddress
}
