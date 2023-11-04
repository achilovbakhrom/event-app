import gql from 'graphql-tag'

const MUTATION_SIGN_OUT = gql`
  mutation SignOut {
    logout
  }
`

export default MUTATION_SIGN_OUT
