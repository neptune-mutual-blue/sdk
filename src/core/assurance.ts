import { ethers } from 'ethers'
import { AssuranceToken, Assurance } from '../registry'
import { ChainId, IApproveTransactionArgs, IWrappedResult, Status } from '../types'
import { getApprovalAmount } from '../utils/erc20-utils'
import { getAddress } from '../utils/signer'

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const contract = await Assurance.getAddress(chainId, signerOrProvider)
  const amount = getApprovalAmount(args)

  const assuranceToken = await AssuranceToken.getInstance(chainId, key, signerOrProvider)

  const result = await assuranceToken.approve(contract, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const add = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const signer = await getAddress(signerOrProvider)
  const contract = await Assurance.getInstance(chainId, signerOrProvider)
  const result = await contract.addAssurance(key, signer, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<IWrappedResult> => {
  const contract = await Assurance.getInstance(chainId, signerOrProvider)
  const result = await contract.getAssurance(key)

  return {
    status: Status.SUCCESS,
    result
  }
}

export { get, approve, add }
