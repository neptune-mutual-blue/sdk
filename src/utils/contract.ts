import { type Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { type Provider } from '@ethersproject/providers'

const getContract = (address: string, abi: any[], signerOrProvider: Provider | Signer): Contract => {
  return new Contract(address, abi, signerOrProvider)
}

export { getContract }
