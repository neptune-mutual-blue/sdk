import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/providers'

import {
  ClaimsProcessor,
  IERC20
} from '../registry'
import {
  ChainId,
  IApproveTransactionArgs,
  IWrappedResult,
  Status
} from '../types'
import { erc20Utils } from '../utils'

const getAllowance = async (chainId: ChainId, cTokenAddress: string, owner: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const cxToken = IERC20.getInstance(cTokenAddress, signerOrProvider)
  const processor = await ClaimsProcessor.getAddress(chainId, signerOrProvider)

  const result = await cxToken.allowance(owner, processor)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, cTokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const cxToken = IERC20.getInstance(cTokenAddress, signerOrProvider)

  const processor = await ClaimsProcessor.getAddress(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)

  const result = await cxToken.approve(processor, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const validate = async (chainId: ChainId, cTokenAddress: string, coverKey: string, productKey: string, incidentDate: number, amount: number, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const processor = await ClaimsProcessor.getInstance(chainId, signerOrProvider)

  const result = await processor.validate(cTokenAddress, coverKey, productKey, incidentDate, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const claim = async (chainId: ChainId, cTokenAddress: string, coverKey: string, productKey: string, incidentDate: number, amount: number, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const processor = await ClaimsProcessor.getInstance(chainId, signerOrProvider)

  const result = await processor.claim(cTokenAddress, coverKey, productKey, incidentDate, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

export { approve, claim, getAllowance, validate }
