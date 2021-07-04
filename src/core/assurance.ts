import { ethers } from 'ethers'
import { getProtocolContracts } from '../constants/contracts'
import { AssuranceToken } from '../registry'
import { ChainId } from '../types'
import { IApproveTransactionArgs } from '../types/IApproveTransaction'

const approveAssurance = async (chainId: ChainId, coverKey: string, args: IApproveTransactionArgs, wallet: ethers.Wallet): Promise<void> => {
  const { COVER_ASSURANCE } = getProtocolContracts(chainId)

  const assuranceToken = await AssuranceToken.getInstance(chainId, coverKey, wallet)
  await assuranceToken.approve(COVER_ASSURANCE, args.amount)
}

export { approveAssurance }
