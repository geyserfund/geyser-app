import { gql } from '@apollo/client'

import { ProjectParametersForLandingPage } from '../projects/projects.graphql'

export enum ActivityResource {
  entry = 'Entry',
  project = 'Project',
  fundingTx = 'FundingTx',
  projectReward = 'ProjectReward',
}

export const FundingTxQueryParameterForLandingPage = `{
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
        type
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
    }
  }
}`

export const EntryQueryParametersForLandingPage = `{
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
  }
}`

export const RewardQueryParametersForLandingPage = `{
  cost
  description
  id
  image
  rewardName: name
  sold
  stock
}`

export const QUERY_ACTIVITIES_FOR_LANDING_PAGE = gql`
  query GetActivities($input: GetActivitiesInput) {
    getActivities(input: $input) {
      id
      resource {
        ... on Entry ${EntryQueryParametersForLandingPage}
        ... on Project ${ProjectParametersForLandingPage}
        ... on FundingTx ${FundingTxQueryParameterForLandingPage}
        ... on ProjectReward ${RewardQueryParametersForLandingPage}
      }
    }
  }
`
