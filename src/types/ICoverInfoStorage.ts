import { type ICoverInfo } from './ICoverInfo.js'

interface ICoverInfoStorage extends ICoverInfo {
  createdBy: string
  permalink: string
}

export type { ICoverInfoStorage }
