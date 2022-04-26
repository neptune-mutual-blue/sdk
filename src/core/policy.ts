import { ethers } from 'ethers'
import { Stablecoin, PolicyContract } from '../registry'
import { ChainId, IApproveTransactionArgs, IPolicyFeeArgs, Status, IWrappedResult } from '../types'
import { erc20Utils } from '../utils'

const getCoverFee = async (chainId: ChainId, key: string, args: IPolicyFeeArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)

  const { duration, amount } = args
  const result = await policy.getCoverFeeInfo(key, duration, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getAllowance = async (chainId: ChainId, owner: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const stablecoin = await Stablecoin.getInstance(chainId, signerOrProvider)
  const policy = await PolicyContract.getAddress(chainId, signerOrProvider)

  const result = await stablecoin.allowance(owner, policy)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const stablecoin = await Stablecoin.getInstance(chainId, signerOrProvider)
  const policy = await PolicyContract.getAddress(chainId, signerOrProvider)

  const amount = erc20Utils.getApprovalAmount(args)

  const result = await stablecoin.approve(policy, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const purchaseCover = async (chainId: ChainId, key: string, args: IPolicyFeeArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer, referralCode: string): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)

  const { duration, amount } = args
  const result = await policy.purchaseCover(key, duration, amount, referralCode)

  return {
    status: Status.SUCCESS,
    result
  }
}

export {
  getAllowance,
  getCoverFee,
  approve,
  purchaseCover
}
