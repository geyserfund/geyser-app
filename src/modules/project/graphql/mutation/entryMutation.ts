import { gql } from '@apollo/client'

export const MUTATION_DELETE_ENTRY = gql`
  mutation DeleteEntry($deleteEntryId: BigInt!) {
    deleteEntry(id: $deleteEntryId) {
      id
      title
    }
  }
`
