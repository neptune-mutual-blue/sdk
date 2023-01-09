import { ICacheProvider } from '../types/ICacheProvider'

class BrowserCacheProvider implements ICacheProvider {
  maxAge: number
  suffix: string

  constructor () {
    this.maxAge = 1000 * 60 * 60 // 1 hour
    this.suffix = '-max-age'
  }

  getExpiryKey (key: string): string {
    return key + this.suffix
  }

  get (key: string): string | null {
    const value = sessionStorage.getItem(key)

    const now = new Date().getTime()
    const expiryKey = this.getExpiryKey(key)
    const expired = parseInt(sessionStorage.getItem(expiryKey) ?? '0')

    if (now > expired) {
      this.remove(key)
      this.remove(expiryKey)
    }

    return value
  }

  set (key: string, value: string): void {
    const expires = new Date().getTime() + this.maxAge
    const expiryKey = this.getExpiryKey(key)

    sessionStorage.setItem(key, value)
    sessionStorage.setItem(expiryKey, expires.toString())
  }

  remove (key: string): void {
    sessionStorage.removeItem(key)
  }
}

export { BrowserCacheProvider }
