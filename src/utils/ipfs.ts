import bs58 from 'bs58'
import IPFS from 'ipfs-mini'

const node = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

const toBytes32 = (ipfsListing: string): string => `0x${bs58.decode(ipfsListing).slice(2).toString('hex')}`
const toIPFShash = (bytes32Hex: string): string => bs58.encode(Buffer.from(`1220${bytes32Hex.slice(2)}`, 'hex'))

const write = async (contents: Object): Promise<string[]> => {
  const formatted = JSON.stringify(contents, null, 2)
  const ipfsHash = await node.add(formatted)
  return [ipfsHash, toBytes32(ipfsHash)]
}

const readBytes32 = async (key: string): Promise<Object> => {
  return read(toIPFShash(key))
}

const read = async (key: string): Promise<Object> => {
  const raw = await node.cat(key)
  return JSON.parse(raw)
}

export { toBytes32, toIPFShash, write, read, readBytes32 }
