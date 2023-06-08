import { gql } from '@apollo/client'

export const FRAGMENT_FUNDING_TX_FOR_PROJECT_FUNDING = gql`
  fragment FundingTxForProjectFunding on FundingTx {
    id
    comment
    amount
    funder {
      id
      amountFunded
      timesFunded
      confirmedAt
      user {
        id
        username
        imageUrl
        externalAccounts {
          externalUsername
          public
          accountType
        }
      }
    }
    paidAt
    onChain
    media
    source
    method
    projectId
    sourceResource {
      ... on Project {
        id
        name
        title
        image
        createdAt
        thumbnailImage
      }
      ... on Entry {
        createdAt
        id
        image
        title
      }
    }
  }
`

export const PROJECT_FUNDING_SUBSCRIPTION = gql`
  ${FRAGMENT_FUNDING_TX_FOR_PROJECT_FUNDING}
  subscription ActivityCreated($input: ActivityCreatedSubscriptionInput) {
    activityCreated(input: $input) {
      ... on FundingTx {
        ...FundingTxForProjectFunding
      }
    }
  }
`
