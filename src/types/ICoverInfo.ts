interface ICoverInfo {
  key: string
  coverName: string
  projectName: string
  about: string
  tags: string[]
  blockchain: {
    chainId: number
    name: string
  }
  smartContracts: string[]
  rules: string
  links: {
    website: string
    documentation: string
    telegram: string
    twitter: string
    github: string
    facebook: string
    blog: string
    discord: string
    linkedin: string
    slack: string
  }
  reportingPeriod: number
  selfCoveragePeriod: number
  resolutionSources: string[]
  assuranceToken: {
    at: string
    name: string
    symbol: string
    initialAmount: string
  }
  stakeWithFees: string
  initialLiquidity: string
}

export { ICoverInfo }
