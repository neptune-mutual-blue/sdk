import { Contract } from '@ethersproject/contracts'
import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { abis } from '../config'
import { contract } from '../utils'

const getInstance = async (fromAddress: string, signerOrProvider: Provider | Signer): Promise<Contract> => {
  return contract.getContract(fromAddress, abis.IUniswapV2PairLike, signerOrProvider)
}

export {
  getInstance
}
