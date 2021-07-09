import { ethers } from 'ethers'
import { LiquidityToken, Vault } from '../registry'
import { IApproveTransactionArgs, ChainId, Status, IWrappedResult } from '../types'
import { erc20Utils, signer } from '../utils'
import { logError } from '../utils/logger'

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const stablecoin = await LiquidityToken.getInstance(chainId, signerOrProvider)
    const vault = await Vault.getInstance(chainId, key, signerOrProvider)

    const amount = erc20Utils.getApprovalAmount(args)

    const result = await stablecoin.approve(vault.address, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    logError(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const add = async (chainId: ChainId, key: string, amount: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const vault = await Vault.getInstance(chainId, key, signerOrProvider)
    const result = await vault.addLiquidity(key, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    logError(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

const getBalance = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const vault = await Vault.getInstance(chainId, key, signerOrProvider)
    const sender = await signer.getAddress(signerOrProvider)
    const result = await vault.balanceOf(sender)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    logError(error.message)

    return {
      status: Status.EXCEPTION,
      result: null,
      error
    }
  }
}

export {
  getBalance,
  approve,
  add
}
