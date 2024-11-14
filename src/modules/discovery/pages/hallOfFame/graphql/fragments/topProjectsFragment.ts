import { gql } from '@apollo/client'

export const TOP_PROJECTS_FRAGMENT = gql`
  fragment TopProjectsFragment on GlobalProjectLeaderboardRow {
    projectName
    projectTitle
    projectThumbnailUrl
    contributionsTotal
    contributionsTotalUsd
    contributionsCount
    contributorsCount
  }
`
