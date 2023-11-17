import {
  type IDisputeInfo,
  type IReportingInfo
} from './IReportingInfo.js'

interface IReportingInfoStorage extends IReportingInfo {
  createdBy: string
  permalink: string
}

interface IDisputeInfoStorage extends IDisputeInfo {
  createdBy: string
  permalink: string
}

export type { IDisputeInfoStorage, IReportingInfoStorage }
