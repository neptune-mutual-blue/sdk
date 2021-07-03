declare module 'ipfs-mini' {
  interface connectionInfo {
    host: string
    port: number
    protocol: string
  }

  export default class IPFS {
    ci: connectionInfo
    constructor (connection: connectionInfo)

    add (contents: string)
    cat (hash: string)
  }
}
