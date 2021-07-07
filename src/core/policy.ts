import { ethers } from 'ethers'
import { ChainId } from '..'
import { LiquidityToken, PolicyContract } from '../registry'
import { IApproveTransactionArgs, IPolicyFeeArgs, Status } from '../types'
import { IWrappedResult } from '../types/IWrappedResult'
import { getApprovalAmount } from '../utils/erc20-utils'

const getCoverFee = async (chainId: ChainId, key: string, args: IPolicyFeeArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const policy = await PolicyContract.getInstance(chainId, signerOrProvider)

    const { duration, amount } = args
    const result = await policy.getCoverFee(key, duration, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const stablecoin = await LiquidityToken.getInstance(chainId, signerOrProvider)
    const policy = await PolicyContract.getInstance(chainId, signerOrProvider)

    const amount = getApprovalAmount(args)

    const result = await stablecoin.approve(policy.address, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const purchaseCover = async (chainId: ChainId, key: string, args: IPolicyFeeArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const policy = await PolicyContract.getInstance(chainId, signerOrProvider)

    const { duration, amount } = args
    const result = await policy.purchaseCover(key, duration, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

export {
  getCoverFee,
  approve,
  purchaseCover
}
