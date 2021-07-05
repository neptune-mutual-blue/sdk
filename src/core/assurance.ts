import { ethers } from 'ethers'
import { getProtocolContracts } from '../constants/contracts'
import { AssuranceToken, Assurance } from '../registry'
import { ChainId } from '../types'
import { IApproveTransactionArgs } from '../types/IApproveTransaction'
import { Status } from '../types/Status'
import { getApprovalAmount } from '../utils/erc20-utils'

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<any> => {
  try {
    const { COVER_ASSURANCE } = getProtocolContracts(chainId)
    const amount = getApprovalAmount(args)

    const assuranceToken = await AssuranceToken.getInstance(chainId, key, signerOrProvider)

    const result = await assuranceToken.approve(COVER_ASSURANCE, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: error
    }
  }
}

const add = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<any> => {
  try {
    const signer = (signerOrProvider as ethers.Signer).getAddress()

    const contract = Assurance.getInstance(chainId, signerOrProvider)

    const result = await contract.addAssurance(key, signer, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

    return {
      status: Status.EXCEPTION,
      result: error
    }
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer | undefined): Promise<any> => {
  try {
    const contract = Assurance.getInstance(chainId, signerOrProvider)
    const result = await contract.getAssurance(key)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    return {
      status: Status.EXCEPTION,
      result: error
    }
  }
}

export { get, approve, add }
