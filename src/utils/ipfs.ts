import { IPFSClient } from '../net'

const fallbackNodes = ['https://ipfs.infura.io:5001', 'https://api.thegraph.com/ipfs']

const write = async (contents: Object, nodeUrls?: string[]): Promise<string | undefined> => {
  const formatted = JSON.stringify(contents, null, 2)

  const nodes = nodeUrls !== undefined ? nodeUrls : fallbackNodes
  const client = new IPFSClient(nodes)

  const hash = await client.addString(formatted)

  if (hash === undefined) {
    return undefined
  }

  return hash
}

const read = async (key: string, nodeUrls?: string[]): Promise<Object | undefined> => {
  const nodes = nodeUrls !== undefined ? nodeUrls : fallbackNodes
  const client = new IPFSClient(nodes)

  const raw = await client.getString(key)

  if (raw !== undefined) {
    return JSON.parse(raw)
  }

  return raw // which is undefined
}

export { write, read }
