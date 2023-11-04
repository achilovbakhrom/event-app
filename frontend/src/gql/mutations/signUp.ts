import gql from 'graphql-tag'

const MUTATION_SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(user: { email: $email password: $password }) {
      id
    }
  }
`

export default MUTATION_SIGN_UP
