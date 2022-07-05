interface IReportingInfo {
  title: string
  observed: Date
  proofOfIncident: string
  description: string
  stake: string
}

interface IDisputeInfo {
  title: string
  proofOfDispute: string
  description: string
  stake: string
}

export { IReportingInfo, IDisputeInfo }
