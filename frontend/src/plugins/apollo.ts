import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev'

function getHeaders() {
  const headers: { Authorization?: string; 'Content-Type'?: string } = {}
  const token = localStorage.getItem('token')
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  headers['Content-Type'] = 'application/json'
  return headers
}

const httpLink = createHttpLink({
  uri: 'http://0.0.0.0:3000/graphql',
  fetch: (uri: RequestInfo, options: RequestInit) => {
    options.headers = getHeaders()
    return fetch(uri, options)
  }
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
})

if (import.meta.env.MODE === 'development') {
  loadErrorMessages()
  loadDevMessages()
}

export default apolloClient
