import { IReportingInfo } from './IReportingInfo'

interface IReportingInfoStorage extends IReportingInfo {
  createdBy: string
  permalink: string
}

export { IReportingInfoStorage }
