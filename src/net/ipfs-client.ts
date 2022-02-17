import { XMLHttpRequest, XMLHttpRequestOptions } from 'xmlhttprequest'
import { XMLHttpRequestReadyState } from '../types'

class IPFSClient {
  urls: string[]

  constructor (urls: string[]) {
    this.urls = urls
  }

  createBoundary (stringPayload: string): string {
    let boundary = 'Delimiter.'

    while (true) {
      boundary += `${Math.random()}`

      if (!stringPayload.includes(boundary)) {
        return boundary
      }
    }
  }

  async addString (value: string): Promise<string | undefined> {
    const boundary = this.createBoundary(value)
    const payload = `--${boundary}\r\nContent-Disposition: form-data; name="path"\r\nContent-Type: application/octet-stream\r\n\r\n${value}\r\n--${boundary}--`
    let result

    for (const url of this.urls) {
      try {
        console.log(url)
        const options = {
          boundary,
          payload,
          method: 'POST',
          url: `${url}/api/v0/add`,
          headers: [['Content-Type', `multipart/form-data; boundary=${boundary}`]]
        }

        result = await this.call(options)

        if (result !== undefined) {
          const { Hash } = JSON.parse(result)
          // console.log('This is the result', Hash)
          return Hash
        }
      } catch (error) {
        console.error(error)
      }
    }

    return undefined
  }

  async getString (hash: string): Promise<string | undefined> {
    const [url] = this.urls

    // eslint-disable-next-line
    return this.call({
      hash,
      method: 'GET',
      url: `${url}/api/v0/cat/${hash}`
    })
  }

  async call (options: XMLHttpRequestOptions): Promise<string | undefined> {
    const { payload, method, url, headers } = options

    const request = new XMLHttpRequest()

    // eslint-disable-next-line
    return new Promise((resolve, reject) => {
      request.onreadystatechange = function () {
        if (request.readyState !== XMLHttpRequestReadyState.DONE) {
          return
        }

        if (request.status !== 200) {
          reject(new Error(`${request.status}: ${request.responseText}`))
        }

        resolve(request.responseText)
      }

      try {
        request.open(method, url)
        request.setRequestHeader('accept', 'application/json')

        if (headers !== undefined) {
          for (const header of headers) {
            if (header === null || header === undefined) {
              continue
            }

            const [key, value] = header
            request.setRequestHeader(key, value)
          }
        }

        if (payload !== undefined) {
          request.send(payload)
          return
        }

        request.send()
      } catch (err) {
        reject(err)
      }
    })
  }
}

export default IPFSClient
