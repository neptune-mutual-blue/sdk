import { ethers } from 'ethers'
import { ChainId, Status, IWrappedResult, PolicyDuration } from '../types'
import { PolicyContract } from '../registry'
import { abis } from '../config'
import { contract } from '../utils'

const getCToken = async (chainId: ChainId, key: string, duration: PolicyDuration, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
  const values = await policy.getCToken(key, duration)
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

const getCTokenByAddress = async (address: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
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

const getCTokenByExpiryDate = async (chainId: ChainId, key: string, expiryDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
  const cxToken = await policy.getCTokenByExpiryDate(key, expiryDate)

  const result = contract.getContract(cxToken, abis.ICxToken, signerOrProvider)

  return {
    status: Status.SUCCESS,
    result
  }
}

export {
  getCToken,
  getCTokenByExpiryDate,
  getCTokenByAddress
}
