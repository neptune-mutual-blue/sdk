import { type IProductInfo } from './IProductInfo.js'

interface IProductInfoStorage extends IProductInfo {
  createdBy: string
  permalink: string
}

export type { IProductInfoStorage }
