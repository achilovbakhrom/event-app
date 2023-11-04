import gql from 'graphql-tag'

const MUTATION_REMOVE_EVENT = gql`
  mutation SignUp($id: Float!) {
    removeEvent(id: $id)
  }
`

export default MUTATION_REMOVE_EVENT
