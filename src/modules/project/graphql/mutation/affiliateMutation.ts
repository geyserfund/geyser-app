import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_AFFILIATE_LINK } from '../fragments/affiliateFragment'

export const MUTATION_PROJECT_AFFILIATE_CREATE = gql`
  ${FRAGMENT_PROJECT_AFFILIATE_LINK}
  mutation AffiliateLinkCreate($input: AffiliateLinkCreateInput!) {
    affiliateLinkCreate(input: $input) {
      ...ProjectAffiliateLink
    }
  }
`

export const MUTATION_PROJECT_AFFILIATE_LABEL_UPDATE = gql`
  ${FRAGMENT_PROJECT_AFFILIATE_LINK}
  mutation AffiliateLinkLabelUpdate($affiliateLinkId: BigInt!, $label: String!) {
    affiliateLinkLabelUpdate(affiliateLinkId: $affiliateLinkId, label: $label) {
      ...ProjectAffiliateLink
    }
  }
`

export const MUTATION_PROJECT_AFFILIATE_DISABLE = gql`
  mutation AffiliateLinkDisable($affiliateLinkId: BigInt!) {
    affiliateLinkDisable(affiliateLinkId: $affiliateLinkId) {
      id
    }
  }
`
