interface IStoreCandidate {
  key: string[] | undefined
  signature: string[] | undefined
  returns: string
  property: string
  compute: ((result: any) => any) | undefined
}

export { IStoreCandidate }
