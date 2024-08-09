import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_AVATAR } from './project'

export const FRAGMENT_USER_PROJECT_CONTRIBUTIONS = gql`
  ${FRAGMENT_PROJECT_AVATAR}
  fragment UserProjectContributions on UserProjectContribution {
    project {
      ...ProjectAvatar
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
