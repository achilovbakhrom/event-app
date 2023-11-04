import gql from 'graphql-tag'

const MUTATION_UPDATE_EVENT = gql`
  mutation UpdateEvent(
    $id: ID!
    $name: String!
    $startDate: DateTime!
    $endDate: DateTime!
    $description: String
    $location: LocationInput
  ) {
    updateEvent(
      event: {
        id: $id
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

export default MUTATION_UPDATE_EVENT
