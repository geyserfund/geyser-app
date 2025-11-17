import { gql } from '@apollo/client'

import { FRAGMENT_PAGINATION } from '@/graphqlBase/fragments/pagination.ts'

import {
  FRAGMENT_CONTRIBUTION_DOWNLOAD_INVOICE,
  FRAGMENT_CONTRIBUTION_FOR_REFUND,
  FRAGMENT_CONTRIBUTION_WITH_INVOICE_STATUS,
  FRAGMENT_ORDER_CONTRIBUTION,
  FRAGMENT_PROJECT_CONTRIBUTION,
} from '../fragments/contributionFragment.ts'

export const QUERY_ORDER_CONTRIBUTIONS = gql`
  ${FRAGMENT_ORDER_CONTRIBUTION}
  ${FRAGMENT_PAGINATION}
  query OrderContributionsGet($input: GetContributionsInput) {
    contributionsGet(input: $input) {
      pagination {
        ...Pagination
      }
      contributions {
        ...OrderContribution
      }
    }
  }
`

export const QUERY_CONTRIBUTION_STATUS_AND_INVOICE_STATUS = gql`
  ${FRAGMENT_CONTRIBUTION_WITH_INVOICE_STATUS}
  query ContributionWithInvoiceStatusGet($contributionId: BigInt!) {
    contribution(id: $contributionId) {
      ...ContributionWithInvoiceStatus
    }
  }
`

export const QUERY_CONTRIBUTION_FOR_DOWNLOAD_INVOICE = gql`
  ${FRAGMENT_CONTRIBUTION_DOWNLOAD_INVOICE}
  query ContributionForDownloadInvoiceGet($contributionId: BigInt!) {
    contribution(id: $contributionId) {
      ...ContributionForDownloadInvoice
    }
  }
`

export const QUERY_PROJECT_PAGE_CONTRIBUTIONS = gql`
  ${FRAGMENT_PROJECT_CONTRIBUTION}
  query ProjectPageContributionsGet($input: GetContributionsInput) {
    contributionsGet(input: $input) {
      contributions {
        ...ProjectContribution
      }
    }
  }
`

export const QUERY_CONTRIBUTION_FOR_REFUND = gql`
  ${FRAGMENT_CONTRIBUTION_FOR_REFUND}
  query ContributionForRefundGet($contributionId: BigInt!) {
    contribution(id: $contributionId) {
      ...ContributionForRefund
    }
  }
`
