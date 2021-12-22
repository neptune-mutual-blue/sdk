import { ethers } from 'ethers'
import { Reassurance, Cover, IERC20, LiquidityToken, NPMToken, Staking } from '../registry'
import { ChainId, ICoverInfo, ICoverInfoStorage, IApproveTransactionArgs, Status, IWrappedResult, exceptions } from '../types'
import { ipfs, erc20Utils, signer } from '../utils'
import { constants } from '../config'
import { ZERO_BYTES32 } from '../config/constants'

const { DuplicateCoverError, InvalidSignerError, InvalidCoverKeyError } = exceptions

const approveReassurance = async (chainId: ChainId, tokenAddress: string, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const reassuranceToken = IERC20.getInstance(chainId, tokenAddress, signerOrProvider)

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

const approveInitialLiquidity = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const liquidity = await LiquidityToken.getInstance(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)
  const cover = await Cover.getAddress(chainId, signerOrProvider)

  const result = await liquidity.approve(cover, amount)

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

  return await ipfs.readBytes32(info) as ICoverInfoStorage
}

const createCover = async (chainId: ChainId, info: ICoverInfo, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const { ZERO_ADDRESS } = constants
  const { key, stakeWithFees, reassuranceToken, initialLiquidity } = info

  if (!key) { // eslint-disable-line
    throw new DuplicateCoverError('Invalid or empty cover key')
  }

  if (!stakeWithFees) { // eslint-disable-line
    throw new DuplicateCoverError('Invalid or empty cover fee')
  }

  const storage = info as ICoverInfoStorage

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  storage.createdBy = account
  storage.permalink = `https://app.neptunemutual.com/covers/view/${key}`

  const [hash, hashBytes32] = await ipfs.write(storage)

  const coverContract = await Cover.getInstance(chainId, signerOrProvider)
  const cover = await coverContract.getCover(key)

  if (cover.coverOwner !== ZERO_ADDRESS) {
    throw new DuplicateCoverError(`The namespace "${key}" already exists`)
  }

  const tx = await coverContract.addCover(
    key,
    hashBytes32,
    info.reportingPeriod,
    stakeWithFees,
    reassuranceToken.at,
    reassuranceToken.initialAmount,
    initialLiquidity
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

export { getCoverInfo, approveReassurance, approveStakeAndFees, approveInitialLiquidity, createCover }
