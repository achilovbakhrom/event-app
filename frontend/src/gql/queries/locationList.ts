import gql from 'graphql-tag'

const QUERY_LOCATION_LIST = gql`
  query GetLocations($filter: FilterInput!) {
    getLocations(filter: $filter) {
      total
      data {
        id
        lattitude
        longitude
      }
    }
  }
`
export default QUERY_LOCATION_LIST
