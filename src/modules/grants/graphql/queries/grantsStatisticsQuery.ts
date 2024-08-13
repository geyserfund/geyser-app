import { gql } from '@apollo/client'

export const QUERY_GRANT_STATISTICS = gql`
  query GrantStatistics {
    grantStatistics {
      grants {
        amountFunded
        amountGranted
        count
      }
      applicants {
        countFunded
      }
    }
  }
`
