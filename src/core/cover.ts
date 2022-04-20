import { ethers } from 'ethers'
import { Reassurance, Cover, IERC20, NPMToken, Staking } from '../registry'
import { ChainId, ICoverInfo, ICoverInfoStorage, IApproveTransactionArgs, Status, IWrappedResult, exceptions } from '../types'
import { ipfs, erc20Utils, signer } from '../utils'
import { constants } from '../config'
import { ZERO_BYTES32 } from '../config/constants'
import { registry } from '..'

const { DuplicateCoverError, GenericError, InvalidAccountError, InvalidSignerError, InvalidCoverKeyError } = exceptions

const whitelistCoverCreator = async (chainId: ChainId, whitelisted: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const { ZERO_ADDRESS } = constants

  if (whitelisted === ZERO_ADDRESS) {
    throw new InvalidAccountError('Invalid account to whitelist')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const tx = await coverContract.updateCoverCreatorWhitelist(whitelisted, true)

  return {
    status: Status.SUCCESS,
    result: {
      tx
    }
  }
}

const removeCoverCreatorFromWhitelist = async (chainId: ChainId, whitelisted: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const { ZERO_ADDRESS } = constants

  if (whitelisted === ZERO_ADDRESS) {
    throw new InvalidAccountError('Invalid account to whitelist')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const tx = await coverContract.updateCoverCreatorWhitelist(whitelisted, false)

  return {
    status: Status.SUCCESS,
    result: {
      tx
    }
  }
}

const approveReassurance = async (chainId: ChainId, tokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const reassuranceToken = IERC20.getInstance(tokenAddress, signerOrProvider)

  const contract = await Reassurance.getAddress(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)

  const result = await reassuranceToken.approve(contract, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approveStakeAndFees = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const npm = await NPMToken.getInstance(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)
  const staking = await Staking.getAddress(chainId, signerOrProvider)
  const result = await npm.approve(staking, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getCoverInfo = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<ICoverInfoStorage> => {
  const coverContract = await Cover.getInstance(chainId, signerOrProvider)
  const cover = await coverContract.getCover(key)

  const { info } = cover

  if (info === ZERO_BYTES32) {
    throw new InvalidCoverKeyError(`Invalid cover key ${key}`)
  }

  return (await ipfs.readBytes32(info)) as ICoverInfoStorage
}

const createCover = async (chainId: ChainId, info: ICoverInfo, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const { ZERO_ADDRESS } = constants
  const { key } = info

  if (!key) { // eslint-disable-line
    throw new DuplicateCoverError('Invalid or empty cover key')
  }

  if (!info.stakeWithFees) { // eslint-disable-line
    throw new DuplicateCoverError('Invalid or empty cover fee')
  }

  const storage = info as ICoverInfoStorage

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  storage.createdBy = account
  storage.permalink = `https://app.neptunemutual.com/covers/view/${key}`

  const payload = await ipfs.write(storage)

  if (payload === undefined) {
    throw new GenericError('Could not save cover to an IPFS network')
  }

  const [hash, hashBytes32] = payload

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)
  const cover = await coverContract.getCover(key)

  if (cover.coverOwner !== ZERO_ADDRESS) {
    throw new DuplicateCoverError(`The namespace "${key}" already exists`)
  }

  const stablecoin = await registry.Stablecoin.getAddress(chainId, signerOrProvider)

  const tx = await coverContract.addCover(
    key,
    hashBytes32,
    stablecoin,
    info.requiresWhitelist,
    [
      info.stakeWithFees.toString(),
      info.reassurance.toString(),
      info.minReportingStake.toString(),
      info.reportingPeriod.toString(),
      info.cooldownPeriod.toString(),
      info.claimPeriod.toString(),
      info.pricingFloor.toString(),
      info.pricingCeiling.toString()
    ]
  )

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
}

export { whitelistCoverCreator, removeCoverCreatorFromWhitelist, getCoverInfo, approveReassurance, approveStakeAndFees, createCover }
