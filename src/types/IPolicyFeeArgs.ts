import { type PolicyDuration } from './PolicyDuration.js'

interface IPolicyFeeArgs {
  duration: PolicyDuration
  amount: string
  referralCode: string
  onBehalfOf: string
}

export type { IPolicyFeeArgs }
