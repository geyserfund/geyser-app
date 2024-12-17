import { gql } from '@apollo/client'

export const TOP_CREATORS_FRAGMENT = gql`
  fragment TopCreatorsFragment on GlobalCreatorLeaderboardRow {
    contributionsTotal
    contributionsTotalUsd
    projectsCount
    userId
    heroId
    guardianType
    userImageUrl
    username
  }
`
