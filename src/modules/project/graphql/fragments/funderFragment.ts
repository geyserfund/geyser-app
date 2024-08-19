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

export const FRAGMENT_PROJECT_LEADERBOARD_CONTRIBUTORS = gql`
  fragment ProjectLeaderboardContributors on ProjectLeaderboardContributorsRow {
    funderId
    contributionsTotalUsd
    contributionsTotal
    contributionsCount
    commentsCount
    user {
      id
      imageUrl
      username
    }
  }
`
