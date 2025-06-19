import { gql } from '@apollo/client'

export const FRAGMENT_BITCOIN_QUOTE = gql`
  fragment BitcoinQuote on BitcoinQuote {
    quote
    quoteCurrency
  }
`

export const FRAGMENT_USER_PROJECT_FUNDER = gql`
  ${FRAGMENT_BITCOIN_QUOTE}
  fragment UserProjectFunder on Funder {
    amountFunded
    confirmedAt
    confirmed
    id
    contributions {
      id
      amount
      comment
      media
      confirmedAt
      bitcoinQuote {
        ...BitcoinQuote
      }
    }
  }
`

export const FRAGMENT_USER_PROJECT_CONTRIBUTION = gql`
  ${FRAGMENT_BITCOIN_QUOTE}
  fragment UserProjectContribution on Contribution {
    id
    amount
    comment
    media
    confirmedAt
    projectId
    bitcoinQuote {
      ...BitcoinQuote
    }
  }
`
