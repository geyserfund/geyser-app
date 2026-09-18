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
      isCircularGrant
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

export const QUERY_LANDING_CIRCULAR_GRANTS_BY_FILTER = gql`
  ${FRAGMENT_LANDING_PROJECT_CARD_PROJECT}
  query LandingCircularGrantsByFilter($where: ProjectsGetWhereInput!, $take: Int!) {
    projectsGet(
      input: { orderBy: [{ direction: desc, field: launchedAt }], where: $where, pagination: { take: $take } }
    ) {
      projects {
        ...LandingProjectCardProject
      }
    }
  }
`

