import { gql } from '@apollo/client'

export const FRAGMENT_BADGE = gql`
  fragment Badge on Badge {
    id
    name
    thumb
    uniqueName
    image
    description
    createdAt
  }
`

export const FRAGMENT_USER_BADGE = gql`
  ${FRAGMENT_BADGE}
  fragment UserBadge on UserBadge {
    id
    userId
    updatedAt
    status
    contributionId
    createdAt
    badgeAwardEventId
    badge {
      ...Badge
    }
  }
`
