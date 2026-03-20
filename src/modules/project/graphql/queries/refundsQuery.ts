import { gql } from '@apollo/client'

import { FRAGMENT_PAYMENT_REFUND, FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT } from '../fragments/refundsFragment'

export const QUERY_PAYMENT_REFUNDS = gql`
  ${FRAGMENT_PAYMENT_REFUND}
  query PaymentRefunds {
    paymentRefundsGet {
      refunds {
        ...PaymentRefund
      }
    }
  }
`

export const QUERY_PAYMENTS_REFUNDABLE = gql`
  query PaymentsRefundable {
    paymentsRefundableGet {
      refundablePayments {
        project {
          id
          name
        }
        payments {
          id
          uuid
          accountingAmountDue
          paymentType
          status
          paymentDetails {
            __typename
            ... on OnChainToLightningSwapPaymentDetails {
              swapMetadata
            }
            ... on OnChainToRskSwapPaymentDetails {
              swapMetadata
            }
          }
        }
      }
    }
  }
`

export const QUERY_PLEDGE_REFUNDS = gql`
  ${FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT}
  query PledgeRefunds {
    pledgeRefundsGet {
      refunds {
        ...PledgeRefundWithPayment
      }
    }
  }
`
