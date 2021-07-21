import { ethers } from 'ethers'
import { LiquidityToken, Vault } from '../registry'
import { IApproveTransactionArgs, ChainId, Status, IWrappedResult } from '../types'
import { erc20Utils, signer } from '../utils'

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const stablecoin = await LiquidityToken.getInstance(chainId, signerOrProvider)
  const vault = await Vault.getAddress(chainId, key, signerOrProvider)

  const amount = erc20Utils.getApprovalAmount(args)

  const result = await stablecoin.approve(vault, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const add = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const vault = await Vault.getInstance(chainId, key, signerOrProvider)
  const result = await vault.addLiquidity(key, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getBalance = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const vault = await Vault.getInstance(chainId, key, signerOrProvider)
  const sender = await signer.getAddress(signerOrProvider)
  const result = await vault.balanceOf(sender)

  return {
    status: Status.SUCCESS,
    result
  }
}

export {
  getBalance,
  approve,
  add
}
