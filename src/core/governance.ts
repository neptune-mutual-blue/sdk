import { ethers } from 'ethers'
import { ZERO_BYTES32 } from '../config/constants'
import { NPMToken, Governance } from '../registry'
import { ChainId, IApproveTransactionArgs, Status, IWrappedResult, IReportingInfo, IReportingInfoStorage, CoverStatus } from '../types'
import { GenericError, InvalidReportError, InvalidSignerError } from '../types/Exceptions'
import { erc20Utils, ipfs, signer } from '../utils'

const approveStake = async (chainId: ChainId, args: IApproveTransactionArgs, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const npm = await NPMToken.getInstance(chainId, signerOrProvider)
  const amount = erc20Utils.getApprovalAmount(args)
  const governance = await Governance.getAddress(chainId, signerOrProvider)
  const result = await npm.approve(governance, amount)

  return {
    status: Status.SUCCESS,
    result
  }
}

const report = async (chainId: ChainId, coverKey: string, productKey: string, info: IReportingInfo, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const { title, observed, proofOfIncident, stake } = info

  if (!title) { // eslint-disable-line
    throw new InvalidReportError('Enter the report title')
  }

  if (!observed) { // eslint-disable-line
    throw new InvalidReportError('Specify when the incident was observed')
  }

  if (!proofOfIncident) { // eslint-disable-line
    throw new InvalidReportError('Provide a proof of the incident')
  }

  if (!stake) { // eslint-disable-line
    throw new InvalidReportError('Specify your NEP stake to report this incident')
  }

  const storage = info as IReportingInfoStorage

  const account = await signer.getAddress(signerOrProvider)

  if (account == null) {
    throw new InvalidSignerError('The provider is not a valid signer')
  }

  storage.createdBy = account
  storage.permalink = `https://app.neptunemutual.com/covers/view/${coverKey}/reporting/${observed.getTime()}`

  const payload = await ipfs.write(storage)

  if (payload === undefined) {
    throw new GenericError('Could not save cover to an IPFS network')
  }

  const [hash, hashBytes32] = payload

  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)
  const incidentDate = await governanceContract.getActiveIncidentDate(coverKey, productKey)

  if (incidentDate.toString() !== '0') {
    throw new InvalidReportError('The incident has already been reported')
  }

  const tx = await governanceContract.report(
    coverKey,
    productKey,
    hashBytes32,
    stake
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

const dispute = async (chainId: ChainId, coverKey: string, productKey: string, stake: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  if (!stake) { // eslint-disable-line
    throw new InvalidReportError('Cannot dispute incident without NEP stake')
  }

  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)
  const incidentDate = await governanceContract.getActiveIncidentDate(coverKey, productKey)

  if (incidentDate.toString() === '0') {
    throw new InvalidReportError('Cannot dispute a non-existing incident')
  }

  const [, no] = await governanceContract.getStakes(coverKey, productKey, incidentDate) // eslint-disable-line

  if (no.toString() !== '0') {
    throw new InvalidReportError('Cannot dispute an already-disputed incident')
  }

  const result = await governanceContract.dispute(
    coverKey,
    productKey,
    incidentDate,
    ZERO_BYTES32,
    stake
  )

  return {
    status: Status.SUCCESS,
    result
  }
}

const attest = async (chainId: ChainId, coverKey: string, productKey: string, stake: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  if (!stake) { // eslint-disable-line
    throw new InvalidReportError('Cannot attest an incident without NEP stake')
  }

  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)
  const incidentDate = await governanceContract.getActiveIncidentDate(coverKey, productKey)

  if (incidentDate.toString() === '0') {
    throw new InvalidReportError('Cannot attest a non-existing incident')
  }

  const result = await governanceContract.attest(
    coverKey,
    productKey,
    incidentDate,
    stake
  )

  return {
    status: Status.SUCCESS,
    result
  }
}

const refute = async (chainId: ChainId, coverKey: string, productKey: string, stake: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  if (!stake) { // eslint-disable-line
    throw new InvalidReportError('Cannot refute an incident without NEP stake')
  }

  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)
  const incidentDate = await governanceContract.getActiveIncidentDate(coverKey, productKey)

  if (incidentDate.toString() === '0') {
    throw new InvalidReportError('Cannot refute a non-existing incident')
  }

  const result = await governanceContract.refute(
    coverKey,
    productKey,
    incidentDate,
    stake
  )

  return {
    status: Status.SUCCESS,
    result
  }
}

const getMinStake = async (chainId: ChainId, key: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = await governanceContract.getFirstReportingStake(key)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getIncidentDate = async (chainId: ChainId, coverKey: string, productKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = await governanceContract.getActiveIncidentDate(coverKey, productKey)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getReporter = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = await governanceContract.getReporter(coverKey, productKey, incidentDate)

  return {
    status: Status.SUCCESS,
    result
  }
}

const getStatus = async (chainId: ChainId, coverKey: string, productKey: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = parseInt(await governanceContract.getStatus(coverKey, productKey))

  return {
    status: Status.SUCCESS,
    result: {
      key: CoverStatus[result],
      value: result
    }
  }
}

const getStakes = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = await governanceContract.getStakes(coverKey, productKey, incidentDate)
  const [yes, no] = result

  return {
    status: Status.SUCCESS,
    result: {
      yes,
      no
    }
  }
}

const getStakesOf = async (chainId: ChainId, coverKey: string, productKey: string, incidentDate: number, account: string, signerOrProvider: ethers.providers.Provider | ethers.Signer): Promise<IWrappedResult> => {
  const governanceContract = await Governance.getInstance(chainId, signerOrProvider)

  const result = await governanceContract.getStakesOf(coverKey, productKey, incidentDate, account)
  const [yes, no] = result

  return {
    status: Status.SUCCESS,
    result: {
      yes,
      no
    }
  }
}

export {
  approveStake,
  report,
  attest,
  dispute,
  refute,
  getMinStake,
  getReporter,
  getIncidentDate,
  getStatus,
  getStakes,
  getStakesOf
}
