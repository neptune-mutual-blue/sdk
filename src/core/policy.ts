import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Stablecoin, PolicyContract } from '../registry'
import { ChainId, IApproveTransactionArgs, IPolicyFeeArgs, Status, IWrappedResult } from '../types'
import { erc20Utils } from '../utils'

const getCoverFee = async (chainId: ChainId, coverKey: string, productKey: string, args: IPolicyFeeArgs, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)

  const { duration, amount } = args
  const result = await policy.getCoverFeeInfo(coverKey, productKey, duration, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getAllowance = async (chainId: ChainId, owner: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const stablecoin = await Stablecoin.getInstance(chainId, signerOrProvider)
  const policy = await PolicyContract.getAddress(chainId, signerOrProvider)

  const result = await stablecoin.allowance(owner, policy)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const stablecoin = await Stablecoin.getInstance(chainId, signerOrProvider)
  const policy = await PolicyContract.getAddress(chainId, signerOrProvider)

  const amount = erc20Utils.getApprovalAmount(args)

  const result = await stablecoin.approve(policy, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const purchaseCover = async (chainId: ChainId, coverKey: string, productKey: string, args: IPolicyFeeArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)

  const { duration, amount, referralCode, onBehalfOf } = args

  const purchaseCoverArgs = {
    onBehalfOf: onBehalfOf,
    coverKey: coverKey,
    productKey: productKey,
    coverDuration: duration,
    amountToCover: amount,
    referralCode: referralCode
  }
  const result = await policy.purchaseCover(purchaseCoverArgs, transactionOverrides)

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
