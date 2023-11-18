import { type ChainId } from './ChainId.js'

interface SDKInternalStorage {
  initialized: boolean
  store?: {
    [key in ChainId]?: string
  }
}

export type { SDKInternalStorage }
