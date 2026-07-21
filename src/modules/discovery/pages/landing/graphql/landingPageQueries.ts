import { gql } from '@apollo/client'

export const FRAGMENT_LANDING_PROJECT_CARD_PROJECT = gql`
  fragment LandingProjectCardProject on Project {
    id
    name
    fundersCount
    thumbnailImage
    shortDescription
    title
    status
    fundingSummary {
      fundingStrategy
      isRecoverableGrant
      raisedSats
      raisedUsdCent
      goalSats
      percentageFunded
      status
      endsAt
      isFundingOpen
      isFundingFailed
      matching {
        activeMatching {
          id
          projectId
          sponsorName
          sponsorUrl
          referenceCurrency
          matchingType
          maxCapAmount
          status
          startDate
          totalMatchedAmount
          totalMatchedAmountSats
          totalMatchedAmountUsdCent
          remainingCapAmount
        }
      }
    }
    category
    subCategory
    location {
      country {
        code
        name
      }
      region
    }
    launchedAt
    owners {
      id
      user {
        id
        guardianType
        username
        imageUrl
        taxProfile {
          legalEntityType
          verified
          country
        }
      }
    }
  }
`

export const FRAGMENT_LANDING_POST_CARD_POST = gql`
  fragment LandingPostCardPost on Post {
    id
    postType
    publishedAt
    title
    image
    description
    project {
      title
      name
      id
      category
      subCategory
      thumbnailImage
    }
  }
`

export const QUERY_LANDING_ABOVE_FOLD = gql`
  ${FRAGMENT_LANDING_PROJECT_CARD_PROJECT}
  query LandingAboveFold($input: ProjectsGetQueryInput!) {
    projectsGet(input: $input) {
      projects {
        ...LandingProjectCardProject
      }
    }
  }
`

export const QUERY_LANDING_CATEGORY_SECTION = gql`
  ${FRAGMENT_LANDING_PROJECT_CARD_PROJECT}
  ${FRAGMENT_LANDING_POST_CARD_POST}
  query LandingCategorySection($category: ProjectCategory!, $mostFundedCategory: String!) {
    latest: projectsGet(
      input: {
        orderBy: [{ direction: desc, field: launchedAt }]
        where: { category: $category, status: active }
        pagination: { take: 5 }
      }
    ) {
      projects {
        ...LandingProjectCardProject
      }
    }
    trending: projectsMostFundedByCategory(input: { category: $mostFundedCategory, range: WEEK, take: 5 }) {
      category
      subCategory
      projects {
        project {
          ...LandingProjectCardProject
        }
        contributionsSummary {
          contributionsTotal
          contributionsTotalUsd
        }
      }
    }
    posts(input: { orderBy: { publishedAt: desc }, pagination: { take: 10 }, where: { category: $category } }) {
      ...LandingPostCardPost
    }
  }
`

export const QUERY_LANDING_OTHER_SECTION = gql`
  ${FRAGMENT_LANDING_PROJECT_CARD_PROJECT}
  ${FRAGMENT_LANDING_POST_CARD_POST}
  query LandingOtherSection {
    latest: projectsGet(
      input: {
        orderBy: [{ direction: desc, field: launchedAt }]
        where: { categories: [ADVOCACY, OTHER], status: active }
        pagination: { take: 5 }
      }
    ) {
      projects {
        ...LandingProjectCardProject
      }
    }
    posts(
      input: { orderBy: { publishedAt: desc }, pagination: { take: 10 }, where: { categories: [ADVOCACY, OTHER] } }
    ) {
      ...LandingPostCardPost
    }
  }
`

export const QUERY_LANDING_ANNOUNCEMENTS = gql`
  ${FRAGMENT_LANDING_POST_CARD_POST}
  query LandingAnnouncements {
    geyserAnnouncements: posts(
      input: {
        orderBy: { publishedAt: desc }
        pagination: { take: 6 }
        where: { postType: [ANNOUNCEMENT], projectName: "geyser" }
      }
    ) {
      ...LandingPostCardPost
    }
    acelerandoVipLeaderboard {
      endAt
    }
  }
`

export const QUERY_LANDING_RECOVERABLE_GRANT_PROJECTS_SECTION = gql`
  ${FRAGMENT_LANDING_PROJECT_CARD_PROJECT}
  query LandingRecoverableGrantProjectsSection {
    projectsGet(
      input: {
        orderBy: [{ direction: desc, field: launchedAt }]
        where: { status: active, isRecoverableGrant: true }
        pagination: { take: 3 }
      }
    ) {
      projects {
        ...LandingProjectCardProject
      }
    }
  }
`

export const QUERY_LANDING_REGIONAL_PROJECTS_SECTION = gql`
  ${FRAGMENT_LANDING_PROJECT_CARD_PROJECT}
  query LandingRegionalProjectsSection($countryCode: String!) {
    projectsGet(
      input: {
        where: { fundingStrategy: TAKE_IT_ALL, countryCode: $countryCode, status: active }
        orderBy: [{ direction: desc, field: launchedAt }, { direction: desc, field: balance }]
        pagination: { take: 6 }
      }
    ) {
      projects {
        ...LandingProjectCardProject
      }
    }
  }
`
