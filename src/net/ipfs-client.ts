import axios from 'axios'
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
    const urls = this.urls

    // eslint-disable-next-line
    return Promise.any(urls.map(url => {
      return this.call({
        hash,
        method: 'POST',
        url: `${url}/api/v0/cat?arg=${hash}`,
        headers: {
          Accept: 'application/json'
        }
      })
    }))
  }

  async call (options: any): Promise<string | undefined> {
    const { payload, method, url, headers } = options

    const result = await axios.request({
      url,
      method,
      headers,
      data: payload
    })

    return JSON.stringify(result.data)
  }
}

export default IPFSClient
