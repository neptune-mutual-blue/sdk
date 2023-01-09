import { Signer } from '@ethersproject/abstract-signer'
import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'

const getContract = (address: string, abi: any[], signerOrProvider: Provider | Signer): Contract => {
  return new Contract(address, abi, signerOrProvider)
}

export { getContract }
