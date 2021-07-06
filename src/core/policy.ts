import { ethers } from 'ethers'
import { ChainId } from '..'
import { PolicyContract } from '../registry'
import { IPolicyFeeArgs, Status } from '../types'
import { IWrappedResult } from '../types/IWrappedResult'

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

export {
  getCoverFee
}
