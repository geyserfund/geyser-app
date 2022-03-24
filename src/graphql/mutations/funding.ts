import { gql } from '@apollo/client';

export const MUTATION_FUND_PROJECT = gql`
mutation FundProject($input: FundingInput!) {
  fundProject(input: $input) {
    success
      message
      fundingTx {
        id
        invoiceId
        paymentRequest
        amount
        status
        canceled
        comment
        paidAt
        onChain
        address
      }
    }
  }
`;

