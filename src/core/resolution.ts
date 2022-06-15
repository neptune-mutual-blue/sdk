import { ethers } from 'ethers'
import { Resolution, Governance } from '../registry'
import { ChainId, Status, IWrappedResult } from '../types'

const finalize = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const resolutionContract = await Resolution.getInstance(chainId, signerOrProvider)

  const result = await resolutionContract.finalize(coverKey, productKey, incidentDate)

  return {
    status: Status.SUCCESS,
    result
  }
}

const resolve = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const resolutionContract = await Resolution.getInstance(chainId, signerOrProvider)

  const result = await resolutionContract.resolve(coverKey, productKey, incidentDate)

  return {
    status: Status.SUCCESS,
    result
  }
}

const emergencyResolve = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, decision: boolean, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const resolutionContract = await Resolution.getInstance(chainId, signerOrProvider)

  const result = await resolutionContract.emergencyResolve(coverKey, productKey, incidentDate, decision)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getResolutionDate = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = await governanceContract.getResolutionDate(key)

  return {
    status: Status.SUCCESS,
    result
  }
}

export {
  resolve,
  emergencyResolve,
  finalize,
  getResolutionDate
}
