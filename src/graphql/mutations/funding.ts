import { gql } from '@apollo/client';

export const MUTATION_FUND = gql`
mutation Fund($input: FundingInput!) {
  fund(input: $input) {
    fundingTx {
      id
      uuid
      invoiceId
      paymentRequest
      amount
      status
      comment
      paidAt
      onChain
      address
    }
    amountSummary {
      total
      donationAmount
      shippingCost
      rewardsCost
    }
  }
}
`;

export const MUTATION_CLAIM_FUNDING = gql`
mutation ClaimAnonymousFunding($uuid: String!) {
  claimAnonymousFunding(uuid: $uuid) {
    fundingTx {
      funder {
        user {
          username
        }
      }
    }
  }
}
`;
