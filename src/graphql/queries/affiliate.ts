import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_AFFILIATE_LINK } from '../fragments/affiliate'

export const QUERY_PROJECT_AFFILIATE_LINK = gql`
  ${FRAGMENT_PROJECT_AFFILIATE_LINK}
  query AffiliateLinksGet($input: GetAffiliateLinksInput!) {
    affiliateLinksGet(input: $input) {
      ...ProjectAffiliateLink
    }
  }
`
