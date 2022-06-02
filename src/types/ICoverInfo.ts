interface ICoverInfo {
  key: string
  coverName: string
  projectName?: string
  tags: string[]
  about: string
  blockchains: {
    chainId?: number
    name: string
  }[]
  rules: string
  exclusions: string
  links: {
    website: string
    documentation?: string
    telegram?: string
    twitter?: string
    github?: string
    facebook?: string
    blog?: string
    discord?: string
    linkedin?: string
    slack?: string
  }
  pricingFloor: string
  pricingCeiling: string
  reportingPeriod: string
  cooldownPeriod: string
  claimPeriod: string
  minReportingStake: string
  resolutionSources: string[]
  stakeWithFees: string
  reassurance: string
  requiresWhitelist: boolean
}

export { ICoverInfo }
