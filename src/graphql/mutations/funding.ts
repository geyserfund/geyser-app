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
        invoiceStatus
        comment
        media
        paidAt
        onChain
        address
        source
        funder {
          user {
            id
            username
            imageUrl
          }
        }
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
