import { gql } from '@apollo/client'

export const MUTATION_USER_BADGE_AWARD = gql`
  mutation UserBadgeAward($userBadgeId: BigInt!) {
    userBadgeAward(userBadgeId: $userBadgeId) {
      badgeAwardEventId
    }
  }
`
