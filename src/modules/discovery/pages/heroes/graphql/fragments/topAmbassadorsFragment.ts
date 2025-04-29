import { gql } from '@apollo/client'

export const TOP_AMBASSADORS_FRAGMENT = gql`
  fragment TopAmbassadorsFragment on GlobalAmbassadorLeaderboardRow {
    contributionsTotal
    contributionsTotalUsd
    projectsCount
    userId
    userHeroId
    userGuardianType
    userImageUrl
    username
  }
`
