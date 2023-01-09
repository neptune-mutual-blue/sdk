import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/providers'

import { abis } from '../config'
import { PolicyContract } from '../registry'
import {
  ChainId,
  IWrappedResult,
  PolicyDuration,
  Status
} from '../types'
import * as contract from '../utils/contract'

const getCToken = async (chainId: ChainId, coverKey: string, productKey: string, duration: PolicyDuration, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
  const values = await policy.getCxToken(coverKey, productKey, duration)
  const { cxToken, expiryDate } = values

  const instance = contract.getContract(cxToken, abis.ICxToken, signerOrProvider)

  return {
    status: Status.SUCCESS,
    result: {
      cxToken: instance,
      expiryDate
    }
  }
}

const getCTokenByAddress = async (address: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const instance = contract.getContract(address, abis.ICxToken, signerOrProvider)
  const expiryDate = await instance.expiresOn()

  return {
    status: Status.SUCCESS,
    result: {
      cxToken: instance,
      expiryDate
    }
  }
}

const getCTokenByExpiryDate = async (chainId: ChainId, coverKey: string, productKey: string, expiryDate: number, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
  const cxToken = await policy.getCxTokenByExpiryDate(coverKey, productKey, expiryDate)

  const result = contract.getContract(cxToken, abis.ICxToken, signerOrProvider)

  return {
    status: Status.SUCCESS,
    result
  }
}

export { getCToken, getCTokenByAddress, getCTokenByExpiryDate }
