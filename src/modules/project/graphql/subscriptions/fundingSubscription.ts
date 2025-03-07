import { gql } from '@apollo/client'

import {
  FRAGMENT_FUNDING_CONTRIBUTION_SUBSCRIPTION,
  FRAGMENT_PROJECT_CONTRIBUTION,
} from '../fragments/contributionFragment.ts'

export const PROJECT_FUNDING_CONTRIBUTION_SUBSCRIPTION = gql`
  ${FRAGMENT_FUNDING_CONTRIBUTION_SUBSCRIPTION}
  subscription FundingContributionStatusUpdated($input: ContributionStatusUpdatedInput) {
    contributionStatusUpdated(input: $input) {
      contribution {
        ...FundingContributionSubscription
      }
    }
  }
`

export const PROJECT_CONTRIBUTION_SUBSCRIPTION = gql`
  ${FRAGMENT_PROJECT_CONTRIBUTION}
  subscription ProjectContribution($input: ContributionStatusUpdatedInput) {
    contributionStatusUpdated(input: $input) {
      contribution {
        ...ProjectContribution
      }
    }
  }
`
