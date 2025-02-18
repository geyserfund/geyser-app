import { gql } from '@apollo/client'

export const QUERY_PROJECT_REWARDS = gql`
  query GetUserIpCountry {
    userIpCountry
  }
`
