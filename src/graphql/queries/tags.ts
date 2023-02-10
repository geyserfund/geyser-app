import { gql } from '@apollo/client'

export const QUERY_TAGS = gql`
  query TagsGet {
    tagsGet {
      label
      id
      count
    }
  }
`
