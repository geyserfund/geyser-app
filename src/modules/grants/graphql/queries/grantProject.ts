import { gql } from '@apollo/client'

export const QUERY_PROJECT_HEADER_SUMMARY = gql`
  query GrantProject($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      subscribersCount
    }
  }
`
