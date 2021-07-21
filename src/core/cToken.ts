import { ethers } from 'ethers'
import { ChainId, Status, IWrappedResult, PolicyDuration } from '../types'
import { PolicyContract } from '../registry'
import { abis } from '../config'
import { contract } from '../utils'

const getCToken = async (chainId: ChainId, key: string, duration: PolicyDuration, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
  const values = await policy.getCToken(key, duration)
  const { cToken, expiryDate } = values

  const instance = contract.getContract(chainId, cToken, abis.ICToken, signerOrProvider)

  return {
    status: Status.SUCCESS,
    result: {
      cToken: instance,
      expiryDate
    }
  }
}

const getCTokenByAddress = async (chainId: ChainId, address: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const instance = contract.getContract(chainId, address, abis.ICToken, signerOrProvider)
  const expiryDate = await instance.expiresOn()

  return {
    status: Status.SUCCESS,
    result: {
      cToken: instance,
      expiryDate
    }
  }
}

const getCTokenByExpiryDate = async (chainId: ChainId, key: string, expiryDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const policy = await PolicyContract.getInstance(chainId, signerOrProvider)
  const cToken = await policy.getCTokenByExpiryDate(key, expiryDate)

  const result = contract.getContract(chainId, cToken, abis.ICToken, signerOrProvider)

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
