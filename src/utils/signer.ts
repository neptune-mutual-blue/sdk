import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'

const getAddress = async (signerOrProvider: Provider | Signer): Promise<string | null> => {
  if (signerOrProvider === undefined) {
    return null
  }

  const signer = (signerOrProvider as Signer)

  // eslint-disable-next-line @typescript-eslint/return-await
  return signer.getAddress()
}

export {
  getAddress
}
