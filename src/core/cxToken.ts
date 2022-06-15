import { ethers } from 'ethers'
import { ChainId, Status, IWrappedResult, PolicyDuration } from '../types'
import { PolicyContract } from '../registry'
import { abis } from '../config'
import { contract } from '../utils'

const getCToken = async (chainId: ChainId, coverKey: string, productKey: string, duration: PolicyDuration, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
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

const getCTokenByExpiryDate = async (chainId: ChainId, coverKey: string, productKey: string, expiryDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
  const cxToken = await policy.getCxTokenByExpiryDate(coverKey, productKey, expiryDate)

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
