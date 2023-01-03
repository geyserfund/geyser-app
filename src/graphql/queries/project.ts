import { gql } from '@apollo/client';

export const QUERY_PROJECT_BY_NAME_OR_ID = gql`
  query GetProject(
    $where: UniqueProjectQueryInput!
    $input: ProjectEntriesGetInput
  ) {
    project(where: $where) {
      id
      title
      name
      type
      description
      balance
      fundingGoal
      createdAt
      updatedAt
      expiresAt
      image
      active
      draft
      rewardCurrency
      fundersCount
      fundingTxsCount
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
        backers
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
        confirmed
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
        }
        amountFunded
        confirmed
      }
      grantees {
        id
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
`;

export const QUERY_PROJECT_FUNDING_DATA = gql`
  query GetProjectFundingData($where: UniqueProjectQueryInput!) {
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
`;

export const QUERY_GRANTS = gql`
  query projects($input: ProjectsGetQueryInput) {
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
        active
        media
        image
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  query projects($input: ProjectsGetQueryInput) {
    projects(input: $input) {
      projects {
        id
        title
        name
        type
        description
        balance
        fundingGoal
        createdAt
        updatedAt
        expiresAt
        image
        active
        draft
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
`;

export const ALL_PROJECTS_SUMMARY = gql`
  query ProjectsSummary {
    projectsSummary {
      fundedTotal
      fundersCount
      projectsCount
    }
  }
`;

export const QUERY_PROJECT_DASHBOARD_DATA = gql`
  query ProjectDashboardData($where: UniqueProjectQueryInput!) {
    project(where: $where) {
      unpublishedEntries: entries(input: { where: { published: false } }) {
        id
        title
        published
        publishedAt
        status
      }
      publishedEntries: entries(input: { where: { published: true } }) {
        id
        title
        published
        publishedAt
        status
      }
      statistics {
        totalVisitors
      }
    }
  }
`;

export const QUERY_GET_PROJECT_FUNDERS = gql`
  query Query($input: GetFundersInput!) {
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
          type
        }
        imageUrl
      }
    }
  }
`;
