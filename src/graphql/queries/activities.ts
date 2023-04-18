import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_LANDING_PAGE } from './project'

export const FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE = gql`
  fragment FundingTxForLandingPage on FundingTx {
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

export const FRAGMENT_ENTRY_FOR_LANDING_PAGE = gql`
  fragment EntryForLandingPage on Entry {
    amountFunded
    entryFundersCount: fundersCount
    entryDescription: description
    id
    image
    title
    project {
      id
      name
      thumbnailImage
      title
    }
    creator {
      id
      imageUrl
      username
    }
  }
`

export const FRAGMENT_REWARD_FOR_LANDING_PAGE = gql`
  fragment RewardForLandingPage on ProjectReward {
    cost
    description
    id
    image
    rewardName: name
    sold
    stock
    rewardProject: project {
      id
      name
      title
      rewardCurrency
      owners {
        id
        user {
          id
          username
          imageUrl
        }
      }
    }
  }
`

export const FRAGMENT_ACTIVITY_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_ENTRY_FOR_LANDING_PAGE}
  ${FRAGMENT_REWARD_FOR_LANDING_PAGE}
  ${FRAGMENT_FUNDING_TX_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  fragment ActivityForLandingPage on Activity {
    id
    createdAt
    resource {
      ... on Entry {
        ...EntryForLandingPage
      }
      ... on Project {
        ...ProjectForLandingPage
      }
      ... on FundingTx {
        ...FundingTxForLandingPage
      }
      ... on ProjectReward {
        ...RewardForLandingPage
      }
    }
  }
`

export const QUERY_ACTIVITIES_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_ACTIVITY_FOR_LANDING_PAGE}
  query ActivitiesForLandingPage($input: GetActivitiesInput) {
    getActivities(input: $input) {
      ...ActivityForLandingPage
    }
  }
`
