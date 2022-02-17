declare module 'xmlhttprequest' {
  interface XMLHttpRequestOptions {
    hash?: string
    payload?: Object
    method: string
    boundary?: string
    url: string
    headers?: string[][]
  }

  class XMLHttpRequest {
    status: number
    responseText: string
    readyState: number
    onreadystatechange ()
    open (method: string, url: string)
    setRequestHeader (key: string, value: string)
    send ()
    send (payload: object)
  }

  export { XMLHttpRequest, XMLHttpRequestOptions }
}
