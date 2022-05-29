import { PolicyDuration } from './PolicyDuration'

interface IPolicyFeeArgs {
  duration: PolicyDuration
  amount: string
  referralCode: string
  onBehalfOf: string
}

export { IPolicyFeeArgs }
