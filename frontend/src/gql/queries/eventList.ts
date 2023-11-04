import gql from 'graphql-tag'

const QUERY_EVENT_LIST = gql`
  query GetEvents($filter: EventFilterInput!) {
    getEvents(filter: $filter) {
      total
      data {
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
  }
`
export default QUERY_EVENT_LIST
