import { gql } from '@apollo/client';

export const ACTIVITY_CREATION_SUBSCRIPTION = gql`
  subscription ActivityCreated {
    activityCreated {
      ... on Project {
        id
      }
      ... on FundingTx {
        id
      }
      ... on Entry {
        id
      }
      ... on ProjectReward {
        id
      }
    }
  }
`;
