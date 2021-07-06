import { ethers } from 'ethers'
import { ChainId } from '..'
import { getChainConfig } from '../constants/contracts'
import { IERC20, Vault } from '../registry'
import { IApproveTransactionArgs } from '../types/IApproveTransactionArgs'
import { Status } from '../types/Status'
import { getApprovalAmount } from '../utils/erc20-utils'
import { IWrappedResult } from '../types/IWrappedResult'
import { getAddress } from '../utils/singer'

const approve = async (chainId: ChainId, key: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const { at } = getChainConfig(chainId).tokens.STABLECOIN
    const stablecoin = IERC20.getInstance(chainId, at, signerOrProvider)
    const vault = await Vault.getInstance(chainId, key, signerOrProvider)

    const amount = getApprovalAmount(args)

    const result = await stablecoin.approve(vault.address, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

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
    console.error(error.message)

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
    const sender = await getAddress(signerOrProvider)
    const result = await vault.balanceOf(sender)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    console.error(error.message)

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
