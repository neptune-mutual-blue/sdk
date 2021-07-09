import { ethers } from 'ethers'

const toBytes32 = (x: string): string => ethers.utils.formatBytes32String(x)
const encodeKeys = (x: string[], y: string[]): string => ethers.utils.solidityKeccak256(x, y)

export {
  toBytes32,
  encodeKeys
}
