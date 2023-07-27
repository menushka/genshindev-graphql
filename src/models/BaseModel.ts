import { addToCache, getFromCache } from '../db/localCache'

export abstract class BaseModel<T> {
  async load() {
    const cache = getFromCache(this.key)
    if (cache) {
      this.process(cache)
    } else {
      this.process(await this.fetch())
    }
  }

  async save() {
    const data = this.saveData()
    addToCache(this.key, data)
  }

  abstract key: string
  abstract fetch(): Promise<T>
  abstract process(data: T): Promise<void>
  abstract saveData(): T
}