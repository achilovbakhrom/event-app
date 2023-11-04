import gql from 'graphql-tag'

const QUERY_GET_EVENT = gql`
  query GetEvent($id: Float!) {
    getEvent(id: $id) {
      id
      name
      startDate
      endDate
      description
      location {
        lattitude
        longitude
      }
    }
  }
`
export default QUERY_GET_EVENT
