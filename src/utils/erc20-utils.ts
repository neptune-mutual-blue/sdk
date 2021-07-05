import { ethers } from 'ethers'

const getApprovalAmount = (x: any): string => (x !== null && x !== undefined && parseFloat(x.amount) > 0) ? x.amount : ethers.constants.MaxUint256

export {
  getApprovalAmount
}
