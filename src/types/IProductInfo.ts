interface IProductInfo {
  coverKey: string
  productKey: string
  productName: string
  requiresWhitelist: boolean
  capitalEfficiency: string
  tags: string[]
  about: string
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
  resolutionSources: string[]
}

export { IProductInfo }
