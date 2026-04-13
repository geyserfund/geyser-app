import { gql } from '@apollo/client'

import { FRAGMENT_USER_PROJECT_CONTRIBUTION } from '../fragments/contributionFragment.ts'
import { FRAGMENT_PROJECT_FOR_PROFILE_PAGE } from '../fragments/projectFragment'
import { FRAGMENT_USER_FOR_PROFILE_PAGE, FRAGMENT_USER_TAX_PROFILE } from '../fragments/userFragment'
import { FRAGMENT_USER_WALLET_CONNECTION_DETAILS } from '../fragments/walletFragment.ts'

export const QUERY_USER_FOR_PROFILE_PAGE = gql`
  ${FRAGMENT_USER_FOR_PROFILE_PAGE}
  query UserForProfilePage($where: UserGetInput!) {
    user(where: $where) {
      ...UserForProfilePage
    }
  }
`

export const QUERY_USER_PROFILE_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_PROFILE_PAGE}
  query UserProfileProjects($where: UserGetInput!) {
    user(where: $where) {
      ownerOf {
        project {
          ...ProjectForProfilePage
        }
      }
    }
  }
`

export const QUERY_USER_FOLLOWED_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_PROFILE_PAGE}
  query UserFollowedProjects($where: UserGetInput!) {
    user(where: $where) {
      projectFollows {
        ...ProjectForProfilePage
      }
    }
  }
`
export const QUERY_USER_CONTRIBUTIONS = gql`
  ${FRAGMENT_USER_PROJECT_CONTRIBUTION}
  query UserProfileContributions($where: UserGetInput!, $input: UserContributionsInput) {
    user(where: $where) {
      id
      contributions(input: $input) {
        ...UserProjectContribution
      }
    }
  }
`

export const QUERY_USER_HERO_STATS = gql`
  query UserHeroStats($where: UserGetInput!) {
    user(where: $where) {
      heroStats {
        ambassadorStats {
          contributionsCount
          contributionsTotalUsd
          contributionsTotal
          projectsCount
          rank
        }
        contributorStats {
          contributionsCount
          contributionsTotalUsd
          contributionsTotal
          projectsCount
          rank
        }
        creatorStats {
          contributionsCount
          contributionsTotalUsd
          contributionsTotal
          projectsCount
          rank
        }
      }
    }
  }
`

export const QUERY_USER_WALLET = gql`
  query UserWallet($where: UserGetInput!) {
    ${FRAGMENT_USER_WALLET_CONNECTION_DETAILS}
    user(where: $where) {
      wallet {
        ...UserWalletConnectionDetails
      }
    }
  }
`
export const QUERY_USER_TAX_PROFILE = gql`
  ${FRAGMENT_USER_TAX_PROFILE}
  query UserTaxProfile($where: UserGetInput!) {
    user(where: $where) {
      taxProfile {
        ...UserTaxProfile
      }
    }
  }
`
