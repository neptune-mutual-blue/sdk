interface IStoreCandidate {
  key?: string[]
  signature?: string[]
  returns: string
  property: string
  compute?: ((result: any) => any)
  args?: string[]
  fn?: string
}

export type { IStoreCandidate }
