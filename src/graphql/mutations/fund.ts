import { gql } from '@apollo/client';

export const MUTATION_FUND_PROJECT = gql`
mutation Mutation($projectId: BigInt!, $amount: Int!, $fundingComment: String, $anonymous: Boolean) {
    fundProject(projectId: $projectId, amount: $amount, fundingComment: $fundingComment, anonymous: $anonymous) {
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

