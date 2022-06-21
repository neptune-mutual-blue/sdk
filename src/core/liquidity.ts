import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Stablecoin, Vault, NPMToken } from '../registry'
import { IApproveTransactionArgs, ChainId, Status, IWrappedResult } from '../types'
import { erc20Utils, signer } from '../utils'

const getAllowance = async (chainId: ChainId, key: string, owner: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const stablecoin = await Stablecoin.getInstance(chainId, signerOrProvider)
  const vault = await Vault.getAddress(chainId, key, signerOrProvider)

  const result = await stablecoin.allowance(owner, vault)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approveStake = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const npm = await NPMToken.getInstance(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)
  const vault = await Vault.getAddress(chainId, key, signerOrProvider)
  const result = await npm.approve(vault, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const stablecoin = await Stablecoin.getInstance(chainId, signerOrProvider)
  const vault = await Vault.getAddress(chainId, key, signerOrProvider)

  const amount = erc20Utils.getApprovalAmount(args)

  const result = await stablecoin.approve(vault, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const add = async (chainId: ChainId, key: string, amount: number, stake: number, signerOrProvider: Provider | Signer, referralCode: string): Promise<IWrappedResult> => {
  const vault = await Vault.getInstance(chainId, key, signerOrProvider)
  const result = await vault.addLiquidity(key, amount, stake, referralCode)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getBalance = async (chainId: ChainId, key: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const vault = await Vault.getInstance(chainId, key, signerOrProvider)
  const result = await vault.getStablecoinBalanceOf()

  return {
    status: Status.SUCCESS,
    result
  }
}

const getBalanceOf = async (chainId: ChainId, key: string, signerOrProvider: Provider | Signer): Promise<IWrappedResult> => {
  const vault = await Vault.getInstance(chainId, key, signerOrProvider)
  const sender = await signer.getAddress(signerOrProvider)
  const result = await vault.balanceOf(sender)

  return {
    status: Status.SUCCESS,
    result
  }
}

export {
  getAllowance,
  getBalance,
  getBalanceOf,
  approve,
  approveStake,
  add
}
