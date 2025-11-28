import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_FUNDER } from './funderFragment.ts'
import { FRAGMENT_ORDER_ITEM } from './orderFragment.ts'
import { FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT } from './paymentFragment.ts'
import { FRAGMENT_USER_AVATAR } from './userFragment.ts'
export const FRAGMENT_FUNDING_CONTRIBUTION = gql`
  ${FRAGMENT_PROJECT_FUNDER}
  ${FRAGMENT_FUNDING_CONTRIBUTION_PAYMENT}
  fragment FundingContribution on Contribution {
    id
    uuid
    amount
    status
    comment
    media
    confirmedAt
    projectId
    creatorEmail
    createdAt
    isAnonymous
    isSubscription
    bitcoinQuote {
      quote
      quoteCurrency
    }
    payments {
      ...FundingContributionPayment
    }
    funder {
      ...ProjectFunder
    }
  }
`

export const FRAGMENT_ORDER_CONTRIBUTION = gql`
  ${FRAGMENT_ORDER_ITEM}
  fragment OrderContribution on Contribution {
    id
    status
    donationAmount
    amount
    email
    uuid
    confirmedAt
    privateComment
    bitcoinQuote {
      quoteCurrency
      quote
    }
    funder {
      user {
        id
        imageUrl
        username
        externalAccounts {
          id
          externalUsername
          externalId
          accountType
          public
        }
      }
    }
    order {
      id
      referenceCode
      totalInSats
      items {
        ...OrderItem
      }
    }
  }
`

export const FRAGMENT_PROJECT_CONTRIBUTION = gql`
  ${FRAGMENT_USER_AVATAR}
  fragment ProjectContribution on Contribution {
    id
    amount
    media
    comment
    confirmedAt
    createdAt
    projectGoalId
    bitcoinQuote {
      quote
      quoteCurrency
    }
    funder {
      id
      timesFunded
      user {
        ...UserAvatar
      }
    }
  }
`

export const FRAGMENT_FUNDING_CONTRIBUTION_SUBSCRIPTION = gql`
  fragment FundingContributionSubscription on Contribution {
    id
    uuid
    status
    projectGoalId
  }
`

export const FRAGMENT_CONTRIBUTION_WITH_INVOICE_STATUS = gql`
  fragment ContributionWithInvoiceStatus on Contribution {
    id
    uuid
    status
    creatorEmail
    isAnonymous
  }
`

export const FRAGMENT_CONTRIBUTION_DOWNLOAD_INVOICE = gql`
  fragment ContributionForDownloadInvoice on Contribution {
    id
    donationAmount
    amount
    uuid
    creatorEmail
    funder {
      user {
        username
        email
        taxProfile {
          fullName
          taxId
        }
      }
    }
    projectId
    confirmedAt
    createdAt
    order {
      items {
        item {
          name
        }
        quantity
        unitPriceInSats
      }
      totalInSats
    }
    creatorTaxProfile {
      fullName
      taxId
    }
    status
    bitcoinQuote {
      quote
      quoteCurrency
    }
    payments {
      status
      uuid
      fees {
        description
        feeType
        feePayer
        feeAmount
        external
        feeCurrency
      }
    }
  }
`

export const FRAGMENT_CONTRIBUTION_FOR_REFUND = gql`
  fragment ContributionForRefund on Contribution {
    id
    amount
    bitcoinQuote {
      quote
      quoteCurrency
    }
    status
    uuid
    projectId
    payments {
      id
      paymentType
      status
      paidAt
      paymentAmount
    }
  }
`

export const FRAGMENT_PROJECT_CONTRIBUTION_REFUND = gql`
  fragment ProjectContributionRefund on Contribution {
    id
    amount
    uuid
    status
    sourceResource {
      ... on Project {
        id
        name
      }
    }
  }
`
