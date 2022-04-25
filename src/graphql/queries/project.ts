import { gql } from '@apollo/client';

export const QUERY_PROJECT_BY_NAME = gql`
query GetProject($where: ProjectQueryInput!) {
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
    active
    ownerConfirmed
    fundsClaimed
    creationConfirmed
    owners {
      id
      user {
        id
        username
        twitterHandle
        imageUrl
      }
    }
    rewards {
      id
      cost
      description
      currency
      name
      backers
    }
    ambassadors {
      id
      user {
        id
        username 
        twitterHandle
        imageUrl
      }
    }
    sponsors {
      id
      user {
        id
        username 
        twitterHandle
        imageUrl
      }
    }
    funders {
      id
      user {
        id
        username
        twitterHandle
        imageUrl
      }
      confirmed
    }
  }
}
`;

export const QUERY_PROJECT_FUNDING_DATA = gql`
query GetProjectFundingData($where: ProjectQueryInput!) {
  project(where: $where) {
    fundingTxs {
      id
      funder {
        amountFunded
        timesFunded
        confirmedAt
        user {
          username
          imageUrl
          twitterHandle
          connectedTwitter
        }
      }
      amount
      paidAt
      comment
      media
      onChain
    }
  }
}
`;

export const QUERY_PROJECTS = gql`
query projects($where: ProjectQueryInput) {
  projects(where: $where) {
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
      active
      ownerConfirmed
      fundsClaimed
      creationConfirmed
      media
      owners {
        id
        user {
          id
          username
          twitterHandle
          imageUrl
        }
      }
      funders {
        id
        user {
          id
          username 
          twitterHandle
          imageUrl
        }
        confirmed
      }
      fundingTxs {
        id
        amount
        paidAt
        comment
        onChain
        funder {
          id
          user {
            username
            imageUrl
            twitterHandle
            connectedTwitter
          }
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
