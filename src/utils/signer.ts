import { ethers } from 'ethers'

const getAddress = async (signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<string | null> => {
  if (signerOrProvider === undefined) {
    return null
  }

  const signer = (signerOrProvider as ethers.Signer)

  // eslint-disable-next-line @typescript-eslint/return-await
  return signer.getAddress()
}

export {
  getAddress
}
