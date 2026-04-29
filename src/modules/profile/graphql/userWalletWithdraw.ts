import { gql } from '@apollo/client'

import { FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND } from '@/modules/project/graphql/fragments/paymentFragment.ts'

export const FRAGMENT_USER_WALLET_WITHDRAW = gql`
  fragment UserWalletWithdraw on UserWalletWithdraw {
    id
    uuid
    status
    amount
    expiresAt
  }
`

export const FRAGMENT_USER_WALLET_WITHDRAW_WITH_PAYMENT = gql`
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  fragment UserWalletWithdrawWithPayment on UserWalletWithdraw {
    amount
    expiresAt
    id
    uuid
    status
    payments {
      ...PaymentForPayoutRefund
    }
  }
`

export const FRAGMENT_USER_WALLET_WITHDRAW_METADATA = gql`
  fragment UserWalletWithdrawMetadata on UserWalletWithdrawMetadata {
    nonce
    swapContractAddress
    contractType
    requiresUserLockTx
  }
`

export const QUERY_USER_WALLET_WITHDRAW_ACTIVE = gql`
  ${FRAGMENT_USER_WALLET_WITHDRAW_WITH_PAYMENT}
  ${FRAGMENT_USER_WALLET_WITHDRAW_METADATA}
  query UserWalletWithdrawActive {
    userWalletWithdrawActive {
      userWalletWithdraw {
        ...UserWalletWithdrawWithPayment
      }
      userWalletWithdrawMetadata {
        ...UserWalletWithdrawMetadata
      }
    }
  }
`

export const QUERY_USER_WALLET_WITHDRAW_LATEST = gql`
  ${FRAGMENT_USER_WALLET_WITHDRAW_WITH_PAYMENT}
  ${FRAGMENT_USER_WALLET_WITHDRAW_METADATA}
  query UserWalletWithdrawLatest {
    userWalletWithdrawLatest {
      userWalletWithdraw {
        ...UserWalletWithdrawWithPayment
      }
      userWalletWithdrawMetadata {
        ...UserWalletWithdrawMetadata
      }
    }
  }
`

export const MUTATION_USER_WALLET_WITHDRAW_PREPARE = gql`
  ${FRAGMENT_USER_WALLET_WITHDRAW_WITH_PAYMENT}
  ${FRAGMENT_USER_WALLET_WITHDRAW_METADATA}
  mutation UserWalletWithdrawPrepare {
    userWalletWithdrawPrepare {
      userWalletWithdraw {
        ...UserWalletWithdrawWithPayment
      }
      userWalletWithdrawMetadata {
        ...UserWalletWithdrawMetadata
      }
    }
  }
`

export const MUTATION_USER_WALLET_WITHDRAW_PAYMENT_PREPARE = gql`
  ${FRAGMENT_USER_WALLET_WITHDRAW}
  ${FRAGMENT_PAYMENT_FOR_PAYOUT_REFUND}
  mutation UserWalletWithdrawPaymentPrepare($input: UserWalletWithdrawPaymentCreateInput!) {
    userWalletWithdrawPaymentPrepare(input: $input) {
      userWalletWithdraw {
        ...UserWalletWithdraw
      }
      swap
      payment {
        ...PaymentForPayoutRefund
      }
    }
  }
`

export const MUTATION_USER_WALLET_WITHDRAW_PAYMENT_INITIATE = gql`
  ${FRAGMENT_USER_WALLET_WITHDRAW}
  mutation UserWalletWithdrawPaymentInitiate($input: UserWalletWithdrawInitiateInput!) {
    userWalletWithdrawPaymentInitiate(input: $input) {
      userWalletWithdraw {
        ...UserWalletWithdraw
      }
      txHash
    }
  }
`
