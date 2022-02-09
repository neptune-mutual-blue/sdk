import { ICacheProvider } from '../types/ICacheProvider'

class BrowserCacheProvider implements ICacheProvider {
  maxAge: number
  suffix: string

  constructor () {
    this.maxAge = 1000 * 60 * 60 // 1 hour
    this.suffix = '-max-age'
  }

  get (key: string): string | null {
    const value = sessionStorage.getItem(key)

    const now = new Date().getTime()
    const expired = parseInt(sessionStorage.getItem(key + this.suffix) ?? '0')

    if (now > expired) {
      this.remove(key)
    }

    return value
  }

  set (key: string, value: string): void {
    const expires = new Date().getTime() + this.maxAge
    sessionStorage.setItem(key, value)
    sessionStorage.setItem(key + this.suffix, expires.toString())
  }

  remove (key: string): void {
    sessionStorage.removeItem(key)
  }
}

export {
  BrowserCacheProvider
}
