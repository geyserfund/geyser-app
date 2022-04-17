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
    active
    media
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
      image
      url
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
      onChain
    }
  }
}
`;

export const QUERY_PROJECTS = gql`
query projects {
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
        image
        url
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
        funder {
          user {
            username
            imageUrl
            twitterHandle
            connectedTwitter
          }
          badges {
            badge
            description
        }
        }
        amount
        paidAt
        comment
        onChain
      }
    }
  }
`;
