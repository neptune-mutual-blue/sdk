import { ethers } from 'ethers'
import { ChainId, IApproveTransactionArgs, IWrappedResult, Status } from '../types'
import { NepToken, ProvisionContract } from '../registry'
import { erc20Utils } from '../utils'
import { logError } from '../utils/logger'

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const nep = await NepToken.getInstance(chainId, signerOrProvider)
    const amount = erc20Utils.getApprovalAmount(args)
    const provision = await ProvisionContract.getInstance(chainId, signerOrProvider)

    const result = await nep.approve(provision.address, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    logError(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const increase = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.increaseProvision(key, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    logError(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const decrease = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.decreaseProvision(key, amount)
    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    logError(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<IWrappedResult> => {
  try {
    const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.getProvision(key)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    logError(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

export {
  get,
  approve,
  increase,
  decrease
}
