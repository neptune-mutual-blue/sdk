import { Provider } from '@ethersproject/providers'
import { Signer } from '@ethersproject/abstract-signer'
import { Cover, IERC20, NPMToken, Staking } from '../registry'
import { ChainId, ICoverInfo, ICoverInfoStorage, IProductInfo, IProductInfoStorage, IApproveTransactionArgs, Status, IWrappedResult, exceptions } from '../types'
import { ipfs, erc20Utils, signer, keyUtil, store } from '../utils'
import { constants, networks } from '../config'
import { InvalidProductKeyError } from '../types/Exceptions'

const { GenericError, InvalidAccountError, InvalidSignerError, InvalidCoverKeyError } = exceptions

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

const createCover = async (chainId: ChainId, info: ICoverInfo, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { key } = info
  const { hostname } = networks.getChainConfig(chainId)

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

  const storage = info as ICoverInfoStorage

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  storage.createdBy = account
  storage.permalink = `https://${hostname}/covers/${key}`

  const hash = await ipfs.write(storage)

  if (hash === undefined) {
    throw new GenericError('Could not save cover to an IPFS network')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const addCoverArgs = {
    coverKey: key,
    info: hash,
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
        hash,
        permalink: `https://ipfs.io/ipfs/${hash}`
      },
      tx
    }
  }
}

const createProduct = async (chainId: ChainId, info: IProductInfo, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { ZERO_BYTES32 } = constants
  const { coverKey, productKey } = info
  const { hostname } = networks.getChainConfig(chainId)

  if (!coverKey || coverKey === ZERO_BYTES32) { // eslint-disable-line
    throw new InvalidCoverKeyError('Invalid or empty cover key')
  }

  if (!productKey || productKey === ZERO_BYTES32) { // eslint-disable-line
    throw new InvalidProductKeyError('Invalid or empty product key')
  }

  const storage = info as IProductInfoStorage

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  storage.createdBy = account
  storage.permalink = `https://${hostname}/covers/${coverKey}/products/${productKey}`

  const hash = await ipfs.write(storage)

  if (hash === undefined) {
    throw new GenericError('Could not save cover to an IPFS network')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const status = 1
  const addProductArgs = {
    coverKey: coverKey,
    productKey: productKey,
    info: hash,
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
        hash,
        permalink: `https://ipfs.io/ipfs/${hash}`
      },
      tx
    }
  }
}

const updateCover = async (chainId: ChainId, info: ICoverInfo, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { key } = info
  const { hostname } = networks.getChainConfig(chainId)

  if (!key) { // eslint-disable-line
    throw new InvalidCoverKeyError('Invalid or empty cover key')
  }

  if (!info.stakeWithFees) { // eslint-disable-line
    throw new GenericError('Invalid or empty cover fee')
  }

  const storage = info as ICoverInfoStorage

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  storage.createdBy = account
  storage.permalink = `https://${hostname}/covers/${key}`

  const hash = await ipfs.write(storage)

  if (hash === undefined) {
    throw new GenericError('Could not save cover to an IPFS network')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const tx = await coverContract.updateCover(key, hash, transactionOverrides)

  return {
    status: Status.SUCCESS,
    result: {
      storage: {
        hash,
        permalink: `https://ipfs.io/ipfs/${hash}`
      },
      tx
    }
  }
}

const updateProduct = async (chainId: ChainId, info: IProductInfo, productStatus: number, signerOrProvider: Provider | Signer, transactionOverrides: any = {}): Promise<IWrappedResult> => {
  const { coverKey, productKey } = info
  const { hostname } = networks.getChainConfig(chainId)

  if (!coverKey) { // eslint-disable-line
    throw new InvalidCoverKeyError('Invalid or empty cover key')
  }

  if (!productKey) { // eslint-disable-line
    throw new InvalidProductKeyError('Invalid or empty product key')
  }

  const storage = info as IProductInfoStorage

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  storage.createdBy = account
  storage.permalink = `https://${hostname}/covers/${coverKey}/products/${productKey}`

  const hash = await ipfs.write(storage)

  if (hash === undefined) {
    throw new GenericError('Could not save cover to an IPFS network')
  }

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)

  const updateProductArgs = {
    coverKey: coverKey,
    productKey: productKey,
    info: hash,
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
        hash,
        permalink: `https://ipfs.io/ipfs/${hash}`
      },
      tx
    }
  }
}

export { whitelistCoverCreator, removeCoverCreatorFromWhitelist, getCoverInfo, getProductInfo, approveReassurance, approveStakeAndFees, createCover, createProduct, updateCover, updateProduct }
