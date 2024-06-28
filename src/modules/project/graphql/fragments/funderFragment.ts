import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FUNDER = gql`
  fragment ProjectFunder on Funder {
    id
    amountFunded
    timesFunded
    user {
      id
      imageUrl
      username
    }
  }
`
