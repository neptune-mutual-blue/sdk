import { ethers } from 'ethers'
import { Assurance, Cover, IERC20, LiquidityToken, NepToken, Staking } from '../registry'
import { ChainId, ICoverInfo, ICoverInfoStorage, IApproveTransactionArgs, Status, IWrappedResult, exceptions } from '../types'
import { ipfs, erc20Utils, signer } from '../utils'
import { constants } from '../config'
import { logError } from '../utils/logger'

const { DuplicateCoverError, InvalidSignerError } = exceptions

const approveAssurance = async (chainId: ChainId, tokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const assuranceToken = IERC20.getInstance(chainId, tokenAddress, signerOrProvider)

    const contract = await Assurance.getInstance(chainId, signerOrProvider)
    const amount = erc20Utils.getApprovalAmount(args)

    const result = await assuranceToken.approve(contract.address, amount)

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

const approveStakeAndFees = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const nep = await NepToken.getInstance(chainId, signerOrProvider)
    const amount = erc20Utils.getApprovalAmount(args)
    const staking = await Staking.getInstance(chainId, signerOrProvider)
    const result = await nep.approve(staking.address, amount)

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

const approveInitialLiquidity = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const liquidity = await LiquidityToken.getInstance(chainId, signerOrProvider)
    const amount = erc20Utils.getApprovalAmount(args)
    const cover = await Cover.getInstance(chainId, signerOrProvider)

    const result = await liquidity.approve(cover.address, amount)

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

const getCoverInfo = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<ICoverInfoStorage> => {
  const coverContract = await Cover.getInstance(chainId, signerOrProvider)
  const cover = await coverContract.getCover(key)
  const { info } = cover

  return await ipfs.readBytes32(info) as ICoverInfoStorage
}

const createCover = async (chainId: ChainId, info: ICoverInfo, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  try {
    const { ZERO_ADDRESS } = constants
    const { key, stakeWithFees, assuranceToken, initialLiquidity } = info

    if (!key) { // eslint-disable-line
      return {
        status: Status.FAILURE,
        result: null,
        error: new DuplicateCoverError('Invalid or empty cover key')
      }
    }

    if (!stakeWithFees) { // eslint-disable-line
      return {
        status: Status.FAILURE,
        result: null,
        error: new DuplicateCoverError('Invalid or empty cover fee')
      }
    }

    const storage = info as ICoverInfoStorage

    const account = await signer.getAddress(signerOrProvider)

    if (account == null) {
      return {
        status: Status.FAILURE,
        result: null,
        error: new InvalidSignerError('The provider is not a valid signer')
      }
    }

    storage.createdBy = account
    storage.permalink = `https://app.neptunemutual.com/covers/view/${key}`

    const [hash, hashBytes32] = await ipfs.write(storage)

    const coverContract = await Cover.getInstance(chainId, signerOrProvider)
    const cover = await coverContract.getCover(key)

    if (cover.coverOwner !== ZERO_ADDRESS) {
      return {
        status: Status.FAILURE,
        result: null,
        error: new DuplicateCoverError(`The namespace "${key}" already exists`)
      }
    }

    const tx = await coverContract.addCover(
      key,
      hashBytes32,
      info.reportingPeriod,
      stakeWithFees,
      assuranceToken.at,
      assuranceToken.initialAmount,
      initialLiquidity)

    return {
      status: Status.SUCCESS,
      result: {
        storage: {
          hashBytes32,
          hash,
          permalink: `https://ipfs.infura.io/ipfs/${hash}`
        },
        tx
      }
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

export { getCoverInfo, approveAssurance, approveStakeAndFees, approveInitialLiquidity, createCover }
