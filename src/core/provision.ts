import { ethers } from 'ethers'
import { ChainId } from '..'
import { getChainConfig } from '../constants/contracts'
import { IERC20, ProvisionContract } from '../registry'
import { IApproveTransactionArgs } from '../types/IApproveTransaction'
import { IWrappedResult } from '../types/IWrappedResult'
import { Status } from '../types/Status'
import { getApprovalAmount } from '../utils/erc20-utils'

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const { tokens: { NEP }, contracts: { COVER_PROVISION } } = getChainConfig(chainId)

    const nep = IERC20.getInstance(chainId, NEP.at, signerOrProvider)
    const amount = getApprovalAmount(args)

    const result = await nep.approve(COVER_PROVISION, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const increase = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const contract = ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.increaseProvision(key, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const decrease = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const contract = ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.decreaseProvision(key, amount)
    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<IWrappedResult> => {
  try {
    const contract = ProvisionContract.getInstance(chainId, signerOrProvider)
    const result = await contract.getProvision(key)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
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
