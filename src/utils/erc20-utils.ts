import { MaxUint256 } from '@ethersproject/constants'

const getApprovalAmount = (x: any): string => (x !== null && x !== undefined && parseFloat(x.amount) > 0) ? x.amount : MaxUint256

export {
  getApprovalAmount
}
