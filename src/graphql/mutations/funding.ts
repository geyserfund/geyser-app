import { gql } from '@apollo/client';

export const MUTATION_FUND = gql`
mutation Fund($input: DonationFundingInput!) {
  fund(input: $input) {
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

export const MUTATION_FUND_WITH_REWARD = gql`
mutation FundWithReward($input: RewardFundingInput!) {
  fundWithReward(input: $input) {
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

