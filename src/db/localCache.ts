let cache = {}
let getFromCache = (key: string) => cache?.[key]
let addToCache = (key: string, value: any) => {
  cache = { ...cache, [key]: value }
}

export { getFromCache, addToCache }
