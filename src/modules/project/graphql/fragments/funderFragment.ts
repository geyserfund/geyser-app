import { gql } from '@apollo/client'

import { FRAGMENT_USER_AVATAR } from './userFragment'

export const FRAGMENT_PROJECT_FUNDER = gql`
  ${FRAGMENT_USER_AVATAR}
  fragment ProjectFunder on Funder {
    id
    amountFunded
    timesFunded
    user {
      ...UserAvatar
    }
  }
`

export const FRAGMENT_PROJECT_LEADERBOARD_CONTRIBUTORS = gql`
  ${FRAGMENT_USER_AVATAR}

  fragment ProjectLeaderboardContributors on ProjectLeaderboardContributorsRow {
    funderId
    contributionsTotalUsd
    contributionsTotal
    contributionsCount
    commentsCount
    user {
      ...UserAvatar
    }
  }
`

export const FRAGMENT_PROJECT_USER_CONTRIBUTOR = gql`
  ${FRAGMENT_USER_AVATAR}
  fragment UserContributor on Funder {
    id
    rank
    user {
      ...UserAvatar
    }
  }
`

export const FRAGMENT_PROJECT_CONTRIBUTOR_CONTRIBUTION_SUMMARY = gql`
  fragment ContributorContributionsSummary on ContributorContributionsSummary {
    contributionsTotalUsd
    contributionsTotal
    contributionsCount
    commentsCount
  }
`
