import gql from 'graphql-tag'

const MUTATION_REMOVE_LOCATION = gql`
  mutation RemoveLocation($id: Float!) {
    removeLocation(id: $id)
  }
`

export default MUTATION_REMOVE_LOCATION
