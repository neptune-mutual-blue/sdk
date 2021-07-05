import { ethers, Signer } from 'ethers'
import { getProtocolContracts, getChainConfig } from '../constants/contracts'
import { Cover, IERC20 } from '../registry'
import { ChainId, ICoverInfo, ICoverInfoStorage } from '../types'
import { IApproveTransactionArgs } from '../types/IApproveTransaction'
import * as ipfs from '../utils/ipfs'
import { ZERO_ADDRESS } from '../constants/values'
import { DuplicateCoverError } from '../types/Exceptions/DuplicateCoverError'
import { Status } from '../types/Status'
import { getApprovalAmount } from '../utils/erc20-utils'

const approveAssurance = async (chainId: ChainId, tokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<any> => {
  try {
    const assuranceToken = IERC20.getInstance(chainId, tokenAddress, signerOrProvider)

    const { COVER_ASSURANCE } = getProtocolContracts(chainId)
    const amount = getApprovalAmount(args)

    const result = await assuranceToken.approve(COVER_ASSURANCE, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    return {
      status: Status.EXCEPTION,
      result: error
    }
  }
}

const approveStakeAndFees = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<any> => {
  try {
    const { tokens: { NEP }, contracts: { COVER_STAKE } } = getChainConfig(chainId)

    const nep = IERC20.getInstance(chainId, NEP.at, signerOrProvider)
    const amount = getApprovalAmount(args)

    const result = await nep.approve(COVER_STAKE, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    return {
      status: Status.EXCEPTION,
      result: error
    }
  }
}

const approveInitialLiquidity = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<any> => {
  try {
    const { tokens: { STABLECOIN }, contracts: { COVER } } = getChainConfig(chainId)

    const nep = IERC20.getInstance(chainId, STABLECOIN.at, signerOrProvider)
    const amount = getApprovalAmount(args)

    const result = await nep.approve(COVER, amount)

    return {
      status: Status.SUCCESS,
      result
    }
  } catch (error) {
    return {
      status: Status.EXCEPTION,
      result: error
    }
  }
}

const getCoverInfo = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<ICoverInfoStorage> => {
  const coverContract = Cover.getInstance(chainId, signerOrProvider)
  const cover = await coverContract.getCover(key)
  const { info } = cover

  return await ipfs.readBytes32(info) as ICoverInfoStorage
}

const createCover = async (chainId: ChainId, info: ICoverInfo, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<any> => {
  try {
    const { key, stakeWithFees, assuranceToken, initialLiquidity } = info

    if (!key) { // eslint-disable-line
      return {
        status: Status.FAILURE,
        data: new DuplicateCoverError('Invalid or empty cover key')
      }
    }

    if (!stakeWithFees) { // eslint-disable-line
      return {
        status: Status.FAILURE,
        data: new DuplicateCoverError('Invalid or empty cover fee')
      }
    }

    const storage = info as ICoverInfoStorage

    storage.createdBy = await (signerOrProvider as Signer).getAddress()
    storage.permalink = `https://app.neptunemutual.com/covers/view/${key}`

    const [hash, hashBytes32] = await ipfs.write(storage)

    const coverContract = Cover.getInstance(chainId, signerOrProvider)
    const cover = await coverContract.getCover(key)

    if (cover.coverOwner !== ZERO_ADDRESS) {
      return {
        status: Status.FAILURE,
        data: new DuplicateCoverError(`The namespace "${key}" already exists`)
      }
    }

    const tx = await coverContract.addCover(
      key,
      hashBytes32,
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
    return {
      status: Status.EXCEPTION,
      result: error
    }
  }
}

export { getCoverInfo, approveAssurance, approveStakeAndFees, approveInitialLiquidity, createCover }
