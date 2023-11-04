import gql from 'graphql-tag'

const QUERY_LOCATION_SELECT = gql`
  query QueryLocationSelect {
    getSelectLocations {
      id
      lattitude
      longitude
    }
  }
`

export default QUERY_LOCATION_SELECT
