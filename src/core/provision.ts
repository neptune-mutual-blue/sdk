import { ethers } from 'ethers'
import { ChainId, IApproveTransactionArgs, IWrappedResult, Status } from '../types'
import { NPMToken, ProvisionContract } from '../registry'
import { erc20Utils } from '../utils'

const getAllowance = async (chainId: ChainId, owner: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const npm = await NPMToken.getInstance(chainId, signerOrProvider)
  const provision = await ProvisionContract.getAddress(chainId, signerOrProvider)

  const result = await npm.approve(owner, provision)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const npm = await NPMToken.getInstance(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)
  const provision = await ProvisionContract.getAddress(chainId, signerOrProvider)

  const result = await npm.approve(provision, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const increase = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
  const result = await contract.increaseProvision(key, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const decrease = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
  const result = await contract.decreaseProvision(key, amount)
  return {
    status: Status.SUCCESS,
    result
  }
}

const get = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const contract = await ProvisionContract.getInstance(chainId, signerOrProvider)
  const result = await contract.getProvision(key)

  return {
    status: Status.SUCCESS,
    result
  }
}

export {
  getAllowance,
  get,
  approve,
  increase,
  decrease
}
