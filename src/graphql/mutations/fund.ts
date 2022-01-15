import { gql } from '@apollo/client';

export const MUTATION_FUND_PROJECT = gql`
mutation Mutation($projectId: BigInt!, $amount: Int!, $comment: String, $anonymous: Boolean) {
    fundProject(projectId: $projectId, amount: $amount, comment: $comment, anonymous: $anonymous) {
      success
      message
      project {
        id
        balance
        fundingGoal
        active
        funders {
          user {
            username
            id
          }
          confirmed
        }
      }
      fundingTx {
        id
        invoiceId
        paymentRequest
        amount
        paid
        canceled
      }
    }
  }
`;

