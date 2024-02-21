import { gql } from '@apollo/client'

export const FRAGMENT_USER_PROJECT_CONTRIBUTIONS = gql`
  fragment UserProjectContributions on UserProjectContribution {
    project {
      id
      thumbnailImage
      name
      title
    }
    funder {
      amountFunded
      confirmedAt
      confirmed
      id
      fundingTxs {
        amountPaid
        comment
        media
        paidAt
        onChain
      }
    }
  }
`
