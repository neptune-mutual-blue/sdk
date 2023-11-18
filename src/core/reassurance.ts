import { type Signer } from '@ethersproject/abstract-signer'
import { type Provider } from '@ethersproject/providers'

import {
  Reassurance,
  Stablecoin
} from '../registry/index.js'
import {
  type ChainId,
  type IApproveTransactionArgs,
  type IWrappedResult,
  Status
} from '../types/index.js'
import { getApprovalAmount } from '../utils/erc20-utils.js'
import { getAddress } from '../utils/signer.js'

const getAllowance = async (chainId: ChainId, owner: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const contract = await Reassurance.getAddress(chainId, signerOrProvider)
  const reassuranceToken = await Stablecoin.getInstance(chainId, signerOrProvider)

  const result = await reassuranceToken.allowance(owner, contract)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const contract = await Reassurance.getAddress(chainId, signerOrProvider)
  const amount = getApprovalAmount(args)

  const reassuranceToken = await Stablecoin.getInstance(chainId, signerOrProvider)

  const result = await reassuranceToken.approve(contract, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const add = async (chainId: ChainId, key: string, amount: number, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const signer = await getAddress(signerOrProvider)
  const contract = await Reassurance.getInstance(chainId, signerOrProvider)
  const result = await contract.addReassurance(key, signer, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const contract = await Reassurance.getInstance(chainId, signerOrProvider)
  const result = await contract.getReassurance(key)

  return {
    status: Status.SUCCESS,
    result
  }
}

export { add, approve, get, getAllowance }
