import { v4 as uuid } from 'uuid'

class IPFSClient {
  urls: string[]

  constructor (urls: string[]) {
    this.urls = urls
  }

  createBoundary (stringPayload: string): string {
    let boundary = 'Delimiter.'

    while (true) {
      boundary += uuid()

      if (!stringPayload.includes(boundary)) {
        return boundary
      }
    }
  }

  async addString (value: string): Promise<string | undefined> {
    const boundary: string = this.createBoundary(value)
    const payload: string = `--${boundary}\r\nContent-Disposition: form-data; name="path"\r\nContent-Type: application/octet-stream\r\n\r\n${value}\r\n--${boundary}--`
    let result

    for (const url of this.urls) {
      try {
        const options = {
          boundary,
          payload,
          method: 'POST',
          url: `${url}/api/v0/add`,
          headers: {
            Accept: 'application/json',
            'Content-Type': `multipart/form-data; boundary=${boundary}`
          }
        }

        result = await this.call(options)
      } catch (error) {
        console.error(error)
      }
    }

    if (result !== undefined) {
      const { Hash } = JSON.parse(result)
      return Hash
    }

    return undefined
  }

  async getString (hash: string): Promise<string | undefined> {
    return await Promise.any(
      this.urls.map(async (url) => {
        return await this.call({
          hash,
          method: 'POST',
          url: `${url}/api/v0/cat?arg=${hash}`,
          headers: {
            Accept: 'application/json'
          }
        })
      })
    )
  }

  async call (options: any): Promise<string | undefined> {
    const { payload, method, url, headers } = options

    const response = await fetch(url, {
      body: payload,
      method,
      headers
    })

    const result = await response.json()

    return JSON.stringify(result)
  }
}

export default IPFSClient
