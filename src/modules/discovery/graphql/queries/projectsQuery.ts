import { gql } from '@apollo/client'

import {
  FRAGMENT_PROJECT_FOR_LANDING_PAGE,
  FRAGMENT_PROJECT_FOR_LAUNCHPAD_PAGE,
  FRAGMENT_PROJECT_FOR_MY_PROJECTS,
  FRAGMENT_PROJECT_THUMBNAIL_IMAGE,
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

export const QUERY_RECOMMENDED_FOR_YOU_PROJECTS = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectRecommendedGet($input: ProjectRecommendedGetInput!) {
    projectRecommendedGet(input: $input) {
      project {
        ...ProjectForLandingPage
      }
    }
  }
`

export const QUERY_AON_PROJECTS_MOST_FUNDED_THIS_WEEK = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsMostFundedAllOrNothing($input: ProjectsMostFundedAllOrNothingInput!) {
    projectsMostFundedAllOrNothing(input: $input) {
      project {
        ...ProjectForLandingPage
      }
    }
  }
`

export const QUERY_PROJECT_THUMBNAIL_IMAGE = gql`
  ${FRAGMENT_PROJECT_THUMBNAIL_IMAGE}
  query ProjectThumbnailImage($where: UniqueProjectQueryInput!) {
    projectGet(where: $where) {
      ...ProjectThumbnailImage
    }
  }
`

export const QUERY_PROJECTS_ALMOST_FUNDED_ALL_OR_NOTHING = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsAonAlmostFunded($input: ProjectsAonAlmostFundedInput) {
    projectsAonAlmostFunded(input: $input) {
      projects {
        ...ProjectForLandingPage
      }
    }
  }
`

export const QUERY_PROJECTS_ALMOST_OVER_ALL_OR_NOTHING = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsAonAlmostOver($input: ProjectsAonAlmostOverInput) {
    projectsAonAlmostOver(input: $input) {
      projects {
        ...ProjectForLandingPage
      }
    }
  }
`

export const QUERY_PROJECTS_MOST_FUNDED_TIA = gql`
  ${FRAGMENT_PROJECT_FOR_LANDING_PAGE}
  query ProjectsMostFundedTakeItAll($input: ProjectsMostFundedTakeItAllInput!) {
    projectsMostFundedTakeItAll(input: $input) {
      project {
        ...ProjectForLandingPage
      }
    }
  }
`
