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

const approveStake = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const npm = await NPMToken.getInstance(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)
  const vault = await Vault.getAddress(chainId, key, signerOrProvider)
  const result = await npm.approve(vault, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const stablecoin = await Stablecoin.getInstance(chainId, signerOrProvider)
  const vault = await Vault.getAddress(chainId, key, signerOrProvider)

  const amount = erc20Utils.getApprovalAmount(args)

  const result = await stablecoin.approve(vault, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const add = async (chainId: ChainId, coverKey: string, amount: string, stake: string, signerOrProvider: Provider | Signer, referralCode: string, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const vault = await Vault.getInstance(chainId, coverKey, signerOrProvider)
  const result = await vault.addLiquidity({
    coverKey,
    amount,
    npmStakeToAdd: stake,
    referralCode
  }, transactionOverrides)

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
