import gql from 'graphql-tag'

const MUTATION_CREATE_LOCATION = gql`
  mutation CreateLocation($location: LocationInput!) {
    createLocation(location: $location) {
      id
    }
  }
`

export default MUTATION_CREATE_LOCATION
