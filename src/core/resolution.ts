import { type Signer } from '@ethersproject/abstract-signer'
import { type Provider } from '@ethersproject/providers'

import {
  Governance,
  Resolution
} from '../registry/index.js'
import {
  type ChainId,
  type IWrappedResult,
  Status
} from '../types/index.js'

const finalize = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const resolutionContract = await Resolution.getInstance(chainId, signerOrProvider)

  const result = await resolutionContract.finalize(coverKey, productKey, incidentDate, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const resolve = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const resolutionContract = await Resolution.getInstance(chainId, signerOrProvider)

  const result = await resolutionContract.resolve(coverKey, productKey, incidentDate, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const emergencyResolve = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, decision: boolean, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const resolutionContract = await Resolution.getInstance(chainId, signerOrProvider)

  const result = await resolutionContract.emergencyResolve(coverKey, productKey, incidentDate, decision, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getResolutionDate = async (chainId: ChainId, coverKey: string, productKey: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = await governanceContract.getResolutionTimestamp(coverKey, productKey)

  return {
    status: Status.SUCCESS,
    result
  }
}

export { emergencyResolve, finalize, getResolutionDate, resolve }
