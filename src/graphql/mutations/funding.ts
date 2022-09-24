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

/*
{
  "input": {
    "sourceResourceInput": {
      "resourceId": null,
      "resourceType": null
    },
    "projectId": null,
    "anonymous": null,
    "donationInput": {
      "donationAmount": null
    },
    "rewardInput": {
      "rewardsCost": null,
      "shipping": {
        "destination": null,
        "cost": null
      },
      "rewards": [
        {
          "quantity": null,
          "id": null
        }
      ]
    },
    "metadataInput": {
      "email": null,
      "comment": null,
      "media": null
    }
  }
}
*/

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
