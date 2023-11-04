import gql from 'graphql-tag'

const QUERY_SIGN_IN = gql`
  query SignIn($email: String!, $password: String!) {
    login(user: { email: $email, password: $password }) {
      accessToken
    }
  }
`

export default QUERY_SIGN_IN
