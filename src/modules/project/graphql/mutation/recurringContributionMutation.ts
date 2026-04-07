import { gql } from '@apollo/client'

export const MUTATION_RECURRING_CONTRIBUTION_CANCEL = gql`
  mutation RecurringContributionCancel($input: RecurringContributionCancelInput!) {
    recurringContributionCancel(input: $input) {
      id
      uuid
      status
      canceledAt
    }
  }
`

export const MUTATION_RECURRING_CONTRIBUTION_PORTAL_SESSION_CREATE = gql`
  mutation RecurringContributionPortalSessionCreate($input: RecurringContributionPortalSessionCreateInput!) {
    recurringContributionPortalSessionCreate(input: $input) {
      url
    }
  }
`
