import { gql } from '@apollo/client'

import { FRAGMENT_BADGE, FRAGMENT_USER_BADGE } from '../fragments/userBadgeFragment.ts'

export const QUERY_BADGES = gql`
  query Badges {
  ${FRAGMENT_BADGE}
    badges {
      ...Badge
    }
  }
`
export const QUERY_USER_BADGES = gql`
  ${FRAGMENT_USER_BADGE}
  query UserBadges($input: BadgesGetInput!) {
    userBadges(input: $input) {
      ...UserBadge
    }
  }
`
