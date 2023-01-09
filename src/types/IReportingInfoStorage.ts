import {
  IDisputeInfo,
  IReportingInfo
} from './IReportingInfo'

interface IReportingInfoStorage extends IReportingInfo {
  createdBy: string
  permalink: string
}

interface IDisputeInfoStorage extends IDisputeInfo {
  createdBy: string
  permalink: string
}

export { IDisputeInfoStorage, IReportingInfoStorage }
