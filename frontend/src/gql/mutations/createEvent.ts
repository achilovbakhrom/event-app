import gql from 'graphql-tag'

const MUTATION_CREATE_EVENT = gql`
  mutation CreateEvent(
    $name: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $description: String
    $location: LocationInput
  ) {
    createEvent(
      event: {
        name: $name
        startDate: $startDate
        endDate: $endDate
        description: $description
        location: $location
      }
    ) {
      id
      name
      startDate
      endDate
      description
    }
  }
`

export default MUTATION_CREATE_EVENT
