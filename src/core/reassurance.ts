import { ethers } from 'ethers'
import { ReassuranceToken, Reassurance } from '../registry'
import { ChainId, IApproveTransactionArgs, IWrappedResult, Status } from '../types'
import { getApprovalAmount } from '../utils/erc20-utils'
import { getAddress } from '../utils/signer'

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const contract = await Reassurance.getAddress(chainId, signerOrProvider)
  const amount = getApprovalAmount(args)

  const reassuranceToken = await ReassuranceToken.getInstance(chainId, key, signerOrProvider)

  const result = await reassuranceToken.approve(contract, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const add = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const signer = await getAddress(signerOrProvider)
  const contract = await Reassurance.getInstance(chainId, signerOrProvider)
  const result = await contract.addReassurance(key, signer, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<IWrappedResult> => {
  const contract = await Reassurance.getInstance(chainId, signerOrProvider)
  const result = await contract.getReassurance(key)

  return {
    status: Status.SUCCESS,
    result
  }
}

export { get, approve, add }
