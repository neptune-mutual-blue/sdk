import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Reassurance, Cover, IERC20, NPMToken, Stablecoin, Staking } from '../registry'
import { ChainId, ICoverInfo, ICoverInfoStorage, IApproveTransactionArgs, Status, IWrappedResult, exceptions } from '../types'
import { ipfs, erc20Utils, signer, keyUtil, store } from '../utils'
import { constants } from '../config'
import { ZERO_BYTES32 } from '../config/constants'

const { DuplicateCoverError, GenericError, InvalidAccountError, InvalidSignerError, InvalidCoverKeyError } = exceptions

const whitelistCoverCreator = async (chainId: ChainId, whitelisted: string, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { ZERO_ADDRESS } = constants

  if (whitelisted === ZERO_ADDRESS) {
    throw new InvalidAccountError('Invalid account to whitelist')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const tx = await coverContract.updateCoverCreatorWhitelist(whitelisted, true, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result: {
      tx
    }
  }
}

const removeCoverCreatorFromWhitelist = async (chainId: ChainId, whitelisted: string, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { ZERO_ADDRESS } = constants

  if (whitelisted === ZERO_ADDRESS) {
    throw new InvalidAccountError('Invalid account to whitelist')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const tx = await coverContract.updateCoverCreatorWhitelist(whitelisted, false, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result: {
      tx
    }
  }
}

const approveReassurance = async (chainId: ChainId, tokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const reassuranceToken = IERC20.getInstance(tokenAddress, signerOrProvider)

  const contract = await Reassurance.getAddress(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)

  const result = await reassuranceToken.approve(contract, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const approveStakeAndFees = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const npm = await NPMToken.getInstance(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)
  const staking = await Staking.getAddress(chainId, signerOrProvider)
  const result = await npm.approve(staking, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getCoverInfo = async (chainId: ChainId, coverKey: string, provider: Provider): Promise<ICoverInfoStorage> => {
  const candidates = [{
    key: [keyUtil.PROTOCOL.NS.COVER_INFO, coverKey],
    signature: ['bytes32', 'bytes32'],
    returns: 'bytes32',
    property: 'info'
  }]
  const { info } = await store.readStorage(chainId, candidates, provider)

  if (info === ZERO_BYTES32) {
    throw new InvalidCoverKeyError(`Invalid cover key ${coverKey}`)
  }

  return (await ipfs.readBytes32(info)) as ICoverInfoStorage
}

const getProductInfo = async (chainId: ChainId, coverKey: string, productKey: string, provider: Provider): Promise<ICoverInfoStorage> => {
  const candidates = [{
    key: [keyUtil.PROTOCOL.NS.COVER_PRODUCT, coverKey, productKey],
    signature: ['bytes32', 'bytes32'],
    returns: 'bytes32',
    property: 'info'
  }]
  const { info } = await store.readStorage(chainId, candidates, provider)

  if (info === ZERO_BYTES32) {
    throw new InvalidCoverKeyError('Invalid cover key or product key')
  }

  return (await ipfs.readBytes32(info)) as ICoverInfoStorage
}

const createCover = async (chainId: ChainId, info: ICoverInfo, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
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

  const stablecoin = await Stablecoin.getAddress(chainId, signerOrProvider)

  const tx = await coverContract.addCover(
    key,
    hashBytes32,
    info.vault.name,
    info.vault.symbol,
    info.supportsProducts,
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
      info.pricingCeiling.toString(),
      info.reassuranceRate.toString(),
      info.leverage.toString()
    ],
    transactionOverrides
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

export { whitelistCoverCreator, removeCoverCreatorFromWhitelist, getCoverInfo, getProductInfo, approveReassurance, approveStakeAndFees, createCover }
