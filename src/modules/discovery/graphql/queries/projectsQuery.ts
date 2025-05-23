import { gql } from '@apollo/client'

import {
  FRAGMENT_PROJECT_FOR_LANDING_PAGE,
  FRAGMENT_PROJECT_FOR_LAUNCHPAD_PAGE,
  FRAGMENT_PROJECT_FOR_MY_PROJECTS,
} from '../fragments/projectFragment'

export const QUERY_PROJECTS_SUMMARY = gql`
  query ProjectsSummary {
    projectsSummary {
      fundedTotal
      fundersCount
      projectsCount
    }
  }
`

export const QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query FeaturedProjectForLandingPage($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectForLandingPage
    }
  }
`

export const QUERY_PROJECTS_MOST_FUNDED_OF_THE_WEEK = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsMostFundedByTag($input: ProjectsMostFundedByTagInput!) {
    projectsMostFundedByTag(input: $input) {
      projects {
        project {
          ...ProjectForLandingPage
        }
      }
      tagId
    }
  }
`

export const QUERY_PROJECTS_MOST_FUNDED_OF_THE_WEEK_BY_CATEGORY = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsMostFundedByCategory($input: ProjectsMostFundedByCategoryInput!) {
    projectsMostFundedByCategory(input: $input) {
      category
      subCategory
      projects {
        project {
          ...ProjectForLandingPage
        }
        contributionsSummary {
          contributionsTotalUsd
          contributionsTotal
        }
      }
    }
  }
`

export const QUERY_PROJECTS_FOR_LANDING_PAGE = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsForLandingPage($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        ...ProjectForLandingPage
      }
    }
  }
`

export const QUERY_PROJECTS_FOR_LAUNCHPAD_PAGE = gql`
  ${FRAGMENT_PROJECT_FOR_LAUNCHPAD_PAGE}
  query ProjectsForLaunchpadPage($input: ProjectsGetQueryInput) {
    projectsGet(input: $input) {
      projects {
        ...ProjectForLaunchpadPage
      }
    }
  }
`

export const QUERY_PROJECTS_FOR_MY_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_MY_PROJECTS}
  query ProjectsForMyProjects($where: UserGetInput!) {
    user(where: $where) {
      ownerOf {
        project {
          ...ProjectForMyProjects
        }
      }
    }
  }
`
