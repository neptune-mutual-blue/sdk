import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { abis } from '../config'
import { contract } from '../utils'

const getInstance = (tokenAddress: string, signerOrProvider: Provider | Signer): Contract => {
  return contract.getContract(tokenAddress, abis.IERC20Detailed, signerOrProvider)
}

export {
  getInstance
}
