import { gql } from '@apollo/client'

export const TOP_CONTRIBUTORS_FRAGMENT = gql`
  fragment TopContributorsFragment on GlobalContributorLeaderboardRow {
    contributionsCount
    contributionsTotal
    contributionsTotalUsd
    projectsContributedCount
    userId
    username
    userImageUrl
  }
`
