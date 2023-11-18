import { type Signer } from '@ethersproject/abstract-signer'
import { type Provider } from '@ethersproject/providers'

const getAddress = async (signerOrProvider: Provider | Signer): Promise<string | null> => {
  if (signerOrProvider === undefined) {
    return null
  }

  const signer = (signerOrProvider as Signer)

  // eslint-disable-next-line @typescript-eslint/return-await
  return signer.getAddress()
}

export { getAddress }
