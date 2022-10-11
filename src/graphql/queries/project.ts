import { gql } from '@apollo/client';

export const QUERY_PROJECT_BY_NAME = gql`
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
      media
      image
      active
      draft
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
        connectionDetails {
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
      fundingTxs {
        id
        funder {
          id
          amountFunded
          timesFunded
          confirmedAt
          user {
            id
            username
            imageUrl
          }
        }
        amount
        paidAt
        comment
        media
        onChain
        source
      }
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
  query projects($where: ProjectQueryInput) {
    projects(where: $where) {
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
