import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_THUMBNAIL_IMAGE } from '@/modules/discovery/graphql/fragments/projectFragment.ts'

import { FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND } from './paymentFragment.ts'

export const FRAGMENT_PAYMENT_REFUND = gql`
  fragment PaymentRefund on PaymentRefund {
    id
    amount
    status
  }
`

export const FRAGMENT_PLEDGE_REFUND = gql`
  ${FRAGMENT_PROJECT_THUMBNAIL_IMAGE}
  fragment PledgeRefund on PledgeRefund {
    id
    amount
    status
    expiresAt
    project {
      ...ProjectThumbnailImage
    }
  }
`

export const FRAGMENT_PLEDGE_REFUND_WITH_PAYMENT = gql`
  ${FRAGMENT_PROJECT_THUMBNAIL_IMAGE}
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  fragment PledgeRefundWithPayment on PledgeRefund {
    id
    amount
    status
    expiresAt
    project {
      ...ProjectThumbnailImage
    }
    payments {
      ...PaymentForPayoutRefund
    }
  }
`

export const FRAGMENT_PLEDGE_REFUND_METADATA = gql`
  fragment PledgeRefundMetadata on PledgeRefundMetadata {
    nonce
    swapContractAddress
    aonContractAddress
  }
`
