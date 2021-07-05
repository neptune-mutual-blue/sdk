import { Status } from './Status'

interface IWrappedResult {
  status: Status
  result: any
  error?: Error
}

export { IWrappedResult }
