import { gql } from '@apollo/client';

export const PROJECT_CREATION_SUBSCRIPTION = gql`
  subscription ProjectCreatedSubscription {
    projectCreated {
      project {
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
