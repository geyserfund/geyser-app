import { gql } from '@apollo/client'

import { FRAGMENT_ENTRY_FOR_PROJECT } from '../fragments/entries'
import {
  FRAGMENT_PROJECT,
  FRAGMENT_PROJECT_FOR_LANDING_PAGE,
} from '../fragments/project'

export const QUERY_PROJECT_BY_NAME_OR_ID = gql`
  ${FRAGMENT_PROJECT}
  query ProjectByNameOrId(
    $where: UniqueProjectQueryInput!
    $input: ProjectEntriesGetInput
  ) {
    project(where: $where) {
      ...Project
    }
  }
`

export const QUERY_PROJECT_FUNDING_DATA = gql`
  query ProjectFundingData($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      funders {
        id
        user {
          id
          username
          imageUrl
        }
        amountFunded
        timesFunded
        confirmedAt
      }
    }
  }
`

export const QUERY_PROJECTS = gql`
  query Projects($input: ProjectsGetQueryInput) {
    projects(input: $input) {
      projects {
        id
        title
        name
        description
        balance
        fundingGoal
        createdAt
        expiresAt
        status
        media
        image
      }
    }
  }
`

export const QUERY_PROJECTS_FULL = gql`
  query ProjectsFull($input: ProjectsGetQueryInput) {
    projects(input: $input) {
      projects {
        id
        title
        name
        type
        shortDescription
        description
        balance
        fundingGoal
        createdAt
        updatedAt
        expiresAt
        thumbnailImage
        image
        status
        media
        owners {
          id
          user {
            id
            username
            imageUrl
          }
        }
        funders {
          id
          user {
            id
            username
            imageUrl
          }
          confirmed
        }
        wallets {
          state {
            status
            statusCode
          }
        }
      }
    }
  }
`

export const QUERY_PROJECTS_SUMMARY = gql`
  query ProjectsSummary {
    projectsSummary {
      fundedTotal
      fundersCount
      projectsCount
    }
  }
`
export const QUERY_PROJECT_UNPUBLISHED_ENTRIES = gql`
  ${FRAGMENT_ENTRY_FOR_PROJECT}
  query ProjectUnplublishedEntries($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      entries: entries(input: { where: { published: false } }) {
        ...EntryForProject
      }
    }
  }
`

export const QUERY_PROJECT_DASHBOARD_DATA = gql`
  ${FRAGMENT_ENTRY_FOR_PROJECT}
  query ProjectDashboardData($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      unpublishedEntries: entries(input: { where: { published: false } }) {
        ...EntryForProject
      }
      publishedEntries: entries(input: { where: { published: true } }) {
        ...EntryForProject
      }
      statistics {
        totalVisitors
      }
    }
  }
`

export const QUERY_PROJECT_FUNDERS = gql`
  query ProjectFunders($input: GetFundersInput!) {
    getFunders(input: $input) {
      amountFunded
      confirmed
      id
      confirmedAt
      timesFunded
      user {
        id
        username
        externalAccounts {
          externalId
          externalUsername
          id
          accountType
        }
        imageUrl
      }
    }
  }
`

export const QUERY_PROJECT_DASHBOARD_FUNDERS = gql`
  query ProjectDashboardFunders($input: GetFundersInput) {
    getDashboardFunders(input: $input) {
      id
      user {
        id
        username
        imageUrl
      }
      fundingTxs {
        email
      }
      rewards {
        quantity
        projectReward {
          id
          name
        }
      }
      amountFunded
      confirmed
      confirmedAt
      timesFunded
    }
  }
`

export const QUERY_PROJECTS_MOST_FUNDED_OF_THE_WEEK = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsMostFundedOfTheWeekGet(
    $input: GetProjectsMostFundedOfTheWeekInput
  ) {
    projectsMostFundedOfTheWeekGet(input: $input) {
      project {
        ...ProjectForLandingPage
      }
    }
  }
`

export const QUERY_PROJECTS_FOR_LANDING_PAGE = gql`
  query ProjectsForLandingPage($input: ProjectsGetQueryInput) {
    projects(input: $input) {
      projects {
        ...ProjectForLandingPage
      }
    }
  }
`
export const QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE = gql`
  query FeaturedProjectForLandingPage($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      ...ProjectForLandingPage
    }
  }
`
