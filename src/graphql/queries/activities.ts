import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FOR_LANDING_PAGE } from './project'

export const FRAGMENT_FUNDING_TX_QUERY_FOR_LANDING_PAGE = gql`
  fragment FragmentFundingTxLandingPage on FundingTx {
    id
    comment
    amount
    funder {
      id
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
        thumbnailImage
      }
      ... on Entry {
        id
        image
        title
      }
    }
  }
`

export const FRAGMENT_ENTRY_QUERY_FOR_LANDING_PAGE = gql`
  fragment FragmentEntryQueryForLandingPage on Entry {
    amountFunded
    entryFundersCount: fundersCount
    entryDescription: description
    id
    image
    title
    project {
      id
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

export const FRAGMENT_REWARD_QUERY_FOR_LANDING_PAGE = gql`
  fragment FragmentRewardQueryForLandingPage on ProjectReward {
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

export const QUERY_ACTIVITIES_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_ENTRY_QUERY_FOR_LANDING_PAGE}
  ${FRAGMENT_REWARD_QUERY_FOR_LANDING_PAGE}
  ${FRAGMENT_FUNDING_TX_QUERY_FOR_LANDING_PAGE}
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query GetActivities($input: GetActivitiesInput) {
    getActivities(input: $input) {
      id
      createdAt
      resource {
        ... on Entry {
          ...FragmentEntryQueryForLandingPage
        }
        ... on Project {
          ...FragmentProjectForLandingPage
        }
        ... on FundingTx {
          ...FragmentFundingTxLandingPage
        }
        ... on ProjectReward {
          ...FragmentRewardQueryForLandingPage
        }
      }
    }
  }
`
