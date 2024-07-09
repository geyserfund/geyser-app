import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_AFFILIATE_LINK = gql`
  fragment ProjectAffiliateLink on AffiliateLink {
    projectId
    label
    id
    email
    disabledAt
    createdAt
    disabled
    affiliateId
    affiliateFeePercentage
  }
`
