import { IProductInfo } from './IProductInfo'

interface IProductInfoStorage extends IProductInfo {
  createdBy: string
  permalink: string
}

export { IProductInfoStorage }
