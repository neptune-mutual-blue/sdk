import { ethers } from 'ethers'
import { AssuranceToken, Assurance } from '../registry'
import { ChainId } from '../types'
import { IApproveTransactionArgs } from '../types/IApproveTransactionArgs'
import { IWrappedResult } from '../types/IWrappedResult'
import { Status } from '../types/Status'
import { getApprovalAmount } from '../utils/erc20-utils'
import { getAddress } from '../utils/singer'

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const contract = await Assurance.getInstance(chainId, signerOrProvider)
    const amount = getApprovalAmount(args)

    const assuranceToken = await AssuranceToken.getInstance(chainId, key, signerOrProvider)

    const result = await assuranceToken.approve(contract.address, amount)

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

const add = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const signer = await getAddress(signerOrProvider)
    const contract = await Assurance.getInstance(chainId, signerOrProvider)
    const result = await contract.addAssurance(key, signer, amount)

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

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<IWrappedResult> => {
  try {
    const contract = await Assurance.getInstance(chainId, signerOrProvider)
    const result = await contract.getAssurance(key)

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

export { get, approve, add }
