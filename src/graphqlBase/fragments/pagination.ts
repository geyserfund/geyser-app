import { gql } from '@apollo/client'

export const FRAGMENT_PAGINATION = gql`
  fragment Pagination on CursorPaginationResponse {
    take
    cursor {
      id
    }
    count
  }
`
