import Lru from 'lru-cache'
import { ICacheProvider } from '../types/ICacheProvider'

class LruCacheProvider implements ICacheProvider {
  cache: Lru<string, string>

  constructor () {
    this.cache = new Lru({
      max: 500,
      maxAge: 1000 * 60 * 60 // 1 hour
    })
  }

  get (key: string): string | null {
    const cached = this.cache.get(key) as string

    if (cached === null) {
      return null
    }

    if (cached === undefined) {
      return null
    }

    if (this.cache.length > 0) {
      return cached
    }

    return null
  }

  set (key: string, value: string): void {
    this.cache.set(key, value)
  }

  remove (key: string): void {
    this.cache.del(key)
  }
}

export {
  LruCacheProvider
}
