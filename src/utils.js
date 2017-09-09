const API_URL = 'http://0.0.0.0:3000'

export function apiUrl (table, query) {
  const url = new URL(API_URL)
  url.pathname = table
  if (query) {
    url.search = encodeURI(Object.keys(query).map(elt => `${elt}=${query[elt]}`).join('&'))
  }
  return url.href
}

export async function fetchAll (urls) {
  const results = await Promise.all(urls.map(u => fetch(u)))
  const toJson = results.map(res => res.json())
  return Promise.all(toJson)
}

export function flatten (arrays) {
  return arrays.reduce((sum, elt, i) => i > 0 ? sum.concat(elt) : sum, arrays[0])
}
