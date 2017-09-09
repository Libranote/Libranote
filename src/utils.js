const API_URL = 'http://0.0.0.0:3000'

export function apiUrl (table, query) {
  const url = new URL(API_URL)
  url.pathname = table
  if (query) {
    url.search = encodeURI(Object.keys(query).map(elt => `${elt}=${query[elt]}`).join('&'))
  }
  return url.href
}
