import { Signer } from '@ethersproject/abstract-signer'
import { Provider } from '@ethersproject/providers'

import {
  constants
} from '../config'
import {
  Cover,
  IERC20,
  NPMToken
} from '../registry'
import {
  ChainId,
  exceptions,
  IApproveTransactionArgs,
  ICoverInfo,
  ICoverInfoStorage,
  IProductInfo,
  IWrappedResult,
  Status
} from '../types'
import { InvalidProductKeyError } from '../types/Exceptions'
import {
  erc20Utils,
  ipfs,
  keyUtil,
  signer,
  store
} from '../utils'

const { GenericError, InvalidAccountError, InvalidSignerError, InvalidCoverKeyError } = exceptions

const whitelistCoverCreator = async (chainId: ChainId, whitelisted: string, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { ZERO_ADDRESS } = constants

  if (whitelisted === ZERO_ADDRESS) {
    throw new InvalidAccountError('Invalid account to whitelist')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const tx = await coverContract.updateCoverCreatorWhitelist([whitelisted], [true], transactionOverrides)

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

  const tx = await coverContract.updateCoverCreatorWhitelist([whitelisted], [false], transactionOverrides)

  return {
    status: Status.SUCCESS,
    result: {
      tx
    }
  }
}

const approveReassurance = async (chainId: ChainId, tokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const reassuranceToken = IERC20.getInstance(tokenAddress, signerOrProvider)

  const contract = await Cover.getAddress(chainId, signerOrProvider)
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
  const contract = await Cover.getAddress(chainId, signerOrProvider)
  const result = await npm.approve(contract, amount, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getCoverInfo = async (chainId: ChainId, coverKey: string, provider: Provider): Promise<ICoverInfoStorage> => {
  const candidates = [{
    key: [keyUtil.PROTOCOL.NS.COVER_INFO, coverKey],
    signature: ['bytes32', 'bytes32'],
    returns: 'string',
    property: 'info'
  }]
  const { info } = await store.readStorage(chainId, candidates, provider)

  if (info === '') {
    throw new InvalidCoverKeyError(`Invalid cover key ${coverKey}`)
  }

  return (await ipfs.read(info)) as ICoverInfoStorage
}

const getProductInfo = async (chainId: ChainId, coverKey: string, productKey: string, provider: Provider): Promise<ICoverInfoStorage> => {
  const candidates = [{
    key: [keyUtil.PROTOCOL.NS.COVER_PRODUCT, coverKey, productKey],
    signature: ['bytes32', 'bytes32'],
    returns: 'bytes32',
    property: 'info'
  }]
  const { info } = await store.readStorage(chainId, candidates, provider)

  if (info === '') {
    throw new InvalidCoverKeyError('Invalid cover key or product key')
  }

  return (await ipfs.read(info)) as ICoverInfoStorage
}

const createCover = async (chainId: ChainId, info: ICoverInfo, ipfsHash: string, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { key } = info

  if (!key) { // eslint-disable-line
    throw new InvalidCoverKeyError('Invalid or empty cover key')
  }

  if (!info.stakeWithFees) { // eslint-disable-line
    throw new GenericError('Invalid or empty cover fee')
  }

  if (!info.vault.name) { // eslint-disable-line
    throw new GenericError('Invalid vault name')
  }

  if (!info.vault.symbol) { // eslint-disable-line
    throw new GenericError('Invalid vault symbol')
  }

  if (typeof info.supportsProducts === 'undefined') { // eslint-disable-line
    throw new GenericError('Invalid value provided for supportsProducts')
  }

  if (typeof info.requiresWhitelist === 'undefined') { // eslint-disable-line
    throw new GenericError('Invalid value provided for requiresWhitelist')
  }

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const addCoverArgs = {
    coverKey: key,
    info: ipfsHash,
    tokenName: info.vault.name,
    tokenSymbol: info.vault.symbol,
    supportsProducts: info.supportsProducts,
    requiresWhitelist: info.requiresWhitelist,
    stakeWithFee: info.stakeWithFees.toString(),
    initialReassuranceAmount: info.reassurance.toString(),
    minStakeToReport: info.minReportingStake.toString(),
    reportingPeriod: info.reportingPeriod.toString(),
    cooldownPeriod: info.cooldownPeriod.toString(),
    claimPeriod: info.claimPeriod.toString(),
    floor: info.pricingFloor.toString(),
    ceiling: info.pricingCeiling.toString(),
    reassuranceRate: info.reassuranceRate.toString(),
    leverageFactor: info.leverage.toString()
  }

  const tx = await coverContract.addCover(
    addCoverArgs,
    transactionOverrides
  )

  return {
    status: Status.SUCCESS,
    result: {
      storage: {
        hash: ipfsHash,
        permalink: `https://ipfs.io/ipfs/${ipfsHash}`
      },
      tx
    }
  }
}

const createProduct = async (chainId: ChainId, info: IProductInfo, ipfsHash: string, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { ZERO_BYTES32 } = constants
  const { coverKey, productKey } = info

  if (!coverKey || coverKey === ZERO_BYTES32) { // eslint-disable-line
    throw new InvalidCoverKeyError('Invalid or empty cover key')
  }

  if (!productKey || productKey === ZERO_BYTES32) { // eslint-disable-line
    throw new InvalidProductKeyError('Invalid or empty product key')
  }

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const status = 1
  const addProductArgs = {
    coverKey: coverKey,
    productKey: productKey,
    info: ipfsHash,
    requiresWhitelist: info.requiresWhitelist,
    productStatus: status,
    efficiency: info.capitalEfficiency
  }

  const tx = await coverContract.addProduct(
    addProductArgs,
    transactionOverrides
  )

  return {
    status: Status.SUCCESS,
    result: {
      storage: {
        hash: ipfsHash,
        permalink: `https://ipfs.io/ipfs/${ipfsHash}`
      },
      tx
    }
  }
}

const updateCover = async (chainId: ChainId, info: ICoverInfo, ipfsHash: string, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { key } = info

  if (!key) { // eslint-disable-line
    throw new InvalidCoverKeyError('Invalid or empty cover key')
  }

  if (!info.stakeWithFees) { // eslint-disable-line
    throw new GenericError('Invalid or empty cover fee')
  }

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const tx = await coverContract.updateCover(key, ipfsHash, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result: {
      storage: {
        hash: ipfsHash,
        permalink: `https://ipfs.io/ipfs/${ipfsHash}`
      },
      tx
    }
  }
}

const updateProduct = async (chainId: ChainId, info: IProductInfo, ipfsHash: string, productStatus: number, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { coverKey, productKey } = info

  if (!coverKey) { // eslint-disable-line
    throw new InvalidCoverKeyError('Invalid or empty cover key')
  }

  if (!productKey) { // eslint-disable-line
    throw new InvalidProductKeyError('Invalid or empty product key')
  }

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const updateProductArgs = {
    coverKey: coverKey,
    productKey: productKey,
    info: ipfsHash,
    productStatus: productStatus,
    efficiency: info.capitalEfficiency
  }

  const tx = await coverContract.updateProduct(
    updateProductArgs,
    transactionOverrides
  )

  return {
    status: Status.SUCCESS,
    result: {
      storage: {
        hash: ipfsHash,
        permalink: `https://ipfs.io/ipfs/${ipfsHash}`
      },
      tx
    }
  }
}

export {
  approveReassurance,
  approveStakeAndFees,
  createCover,
  createProduct,
  getCoverInfo,
  getProductInfo,
  removeCoverCreatorFromWhitelist,
  updateCover,
  updateProduct,
  whitelistCoverCreator
}
