import { gql } from '@apollo/client'

import { FRAGMENT_USER_AVATAR } from './userFragment'

export const FRAGMENT_PROJECT_FUNDING_TX = gql`
  ${FRAGMENT_USER_AVATAR}
  fragment ProjectFundingTx on FundingTx {
    id
    amountPaid
    media
    comment
    bitcoinQuote {
      quote
      quoteCurrency
    }
    funder {
      id
      user {
        ...UserAvatar
      }
    }
  }
`
