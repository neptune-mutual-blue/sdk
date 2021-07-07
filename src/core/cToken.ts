import { ethers } from 'ethers'
import { ChainId } from '..'
import { IERC20, PolicyContract } from '../registry'
import { Status } from '../types'
import { IWrappedResult } from '../types/IWrappedResult'
import { PolicyDuration } from '../types/PolicyDuration'

const getCToken = async (chainId: ChainId, key: string, duration: PolicyDuration, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
    const values = await policy.getCToken(key, duration)
    const { cToken, expiryDate } = values

    const instance = IERC20.getInstance(chainId, cToken, signerOrProvider)

    return {
      status: Status.SUCCESS,
      result: {
        cToken: instance,
        expiryDate
      }
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

const getCTokenByExpiryDate = async (chainId: ChainId, key: string, expiryDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
    const cToken = await policy.getCTokenByExpiryDate(key, expiryDate)

    const result = IERC20.getInstance(chainId, cToken, signerOrProvider)

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
  getCToken,
  getCTokenByExpiryDate
}
