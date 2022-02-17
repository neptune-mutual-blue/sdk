import bs58 from 'bs58'
import { IPFSClient } from '../net'

const fallbackNodes = ['https://ipfs.infura.io:5001', 'https://api.thegraph.com/ipfs']

const toBytes32 = (ipfsListing: string): string => `0x${bs58.decode(ipfsListing).slice(2).toString('hex')}`
const toIPFShash = (bytes32Hex: string): string => bs58.encode(Buffer.from(`1220${bytes32Hex.slice(2)}`, 'hex'))

const write = async (contents: Object, nodeUrls?: string[]): Promise<string[] | undefined> => {
  const formatted = JSON.stringify(contents, null, 2)

  const nodes = nodeUrls !== undefined ? nodeUrls : fallbackNodes
  const client = new IPFSClient(nodes)

  const hash = await client.addString(formatted)

  if (hash === undefined) {
    return undefined
  }

  return [hash, toBytes32(hash)]
}

const read = async (key: string, nodeUrls?: string[]): Promise<Object|undefined> => {
  const nodes = nodeUrls !== undefined ? nodeUrls : fallbackNodes
  const client = new IPFSClient(nodes)

  const raw = await client.getString(key)

  if (raw !== undefined) {
    return JSON.parse(raw)
  }

  return raw // which is undefined
}

const readBytes32 = async (key: string): Promise<Object | undefined> => {
  // eslint-disable-next-line @typescript-eslint/return-await
  return read(toIPFShash(key))
}

export { toBytes32, toIPFShash, write, read, readBytes32 }
