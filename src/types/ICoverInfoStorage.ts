import { ICoverInfo } from './ICoverInfo'

interface ICoverInfoStorage extends ICoverInfo {
  createdBy: string
  permalink: string
}

export { ICoverInfoStorage }
