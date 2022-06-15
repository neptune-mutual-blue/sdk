import { ethers } from 'ethers'
import { ClaimsProcessor, IERC20 } from '../registry'
import { ChainId, IApproveTransactionArgs, Status, IWrappedResult } from '../types'
import { erc20Utils } from '../utils'

const getAllowance = async (chainId: ChainId, cTokenAddress: string, owner: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const cxToken = IERC20.getInstance(cTokenAddress, signerOrProvider)
  const processor = await ClaimsProcessor.getAddress(chainId, signerOrProvider)

  const result = await cxToken.allowance(owner, processor)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, cTokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const cxToken = IERC20.getInstance(cTokenAddress, signerOrProvider)

  const processor = await ClaimsProcessor.getAddress(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)

  const result = await cxToken.approve(processor, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const validate = async (chainId: ChainId, cTokenAddress: string, coverKey: string, productKey: string, incidentDate: number, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const processor = await ClaimsProcessor.getInstance(chainId, signerOrProvider)

  const result = await processor.validate(cTokenAddress, coverKey, productKey, incidentDate, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const claim = async (chainId: ChainId, cTokenAddress: string, coverKey: string, productKey: string, incidentDate: number, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const processor = await ClaimsProcessor.getInstance(chainId, signerOrProvider)

  const result = await processor.claim(cTokenAddress, coverKey, productKey, incidentDate, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

export {
  getAllowance,
  approve,
  validate,
  claim
}
