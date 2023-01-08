import { gql } from '@apollo/client';

export const PROJECT_ACTIVATION_SUBSCRIPTION = gql`
  subscription ProjectActivationSubscription {
    projectActivated {
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
