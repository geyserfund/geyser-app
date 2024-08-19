import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_CONTRIBUTIONS_STATS = gql`
  fragment ProjectContributionsStats on ProjectContributionsStatsBase {
    contributions {
      total
      totalUsd
    }
  }
`

export const FRAGMENT_PROJECT_STATS = gql`
  ${FRAGMENT_PROJECT_CONTRIBUTIONS_STATS}

  fragment ProjectStats on ProjectStats {
    current {
      projectContributionsStats {
        ...ProjectContributionsStats
      }
    }
  }
`
