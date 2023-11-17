import { type Status } from './Status.js'

interface IWrappedResult {
  status: Status
  result: any
  error?: Error
}

export type { IWrappedResult }
