import { gql } from '@apollo/client'

export const QUERY_PROJECT_BY_NAME_OR_ID = gql`
  query ProjectByNameOrId(
    $where: UniqueProjectQueryInput!
    $input: ProjectEntriesGetInput
  ) {
    project(where: $where) {
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
      image
      thumbnailImage
      links
      status
      rewardCurrency
      fundersCount
      fundingTxsCount
      location {
        country {
          name
          code
        }
        region
      }
      tags {
        id
        label
      }
      owners {
        id
        user {
          id
          username
          imageUrl
        }
      }
      rewards {
        id
        cost
        description
        name
        sold
        image
      }
      ambassadors {
        id
        confirmed
        user {
          id
          username
          imageUrl
        }
      }
      sponsors {
        id
        url
        image
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
          email
        }
        amountFunded
        confirmed
        confirmedAt
        timesFunded
      }
      milestones {
        id
        name
        description
        amount
      }
      entries(input: $input) {
        id
        title
        description
        image
        type
        fundersCount
        amountFunded
        published
        status
        createdAt
        publishedAt
        creator {
          id
          username
          imageUrl
        }
      }
      wallets {
        id
        name
        state {
          status
          statusCode
        }
        connectionDetails {
          ... on LightningAddressConnectionDetails {
            lightningAddress
          }
          ... on LndConnectionDetailsPrivate {
            macaroon
            tlsCertificate
            hostname
            grpcPort
            lndNodeType
            pubkey
          }
          ... on LndConnectionDetailsPublic {
            pubkey
          }
        }
      }
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
  query ProjectUnplublishedEntries($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      entries: entries(input: { where: { published: false } }) {
        id
        title
        description
        image
        type
        fundersCount
        amountFunded
        published
        publishedAt
        status
        createdAt
        creator {
          id
          username
          imageUrl
        }
      }
    }
  }
`

export const QUERY_PROJECT_DASHBOARD_DATA = gql`
  query ProjectDashboardData($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      unpublishedEntries: entries(input: { where: { published: false } }) {
        id
        title
        image
        description
        fundersCount
        amountFunded
        published
        publishedAt
        status
      }
      publishedEntries: entries(input: { where: { published: true } }) {
        id
        title
        image
        description
        fundersCount
        amountFunded
        published
        publishedAt
        status
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

export const FRAGMENT_PROJECT_FOR_LANDING_PAGE = gql`
  fragment ProjectForLandingPage on Project {
    id
    name
    balance
    createdAt
    fundersCount
    fundingTxsCount
    thumbnailImage
    shortDescription
    tags {
      id
      label
    }
    title
    status
    owners {
      id
      user {
        id
        username
        imageUrl
      }
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
