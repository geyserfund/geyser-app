import { gql } from '@apollo/client'

export const BADGES_QUERY = gql`
  query Badges {
    badges {
      createdAt
      description
      id
      image
      name
      thumb
      uniqueName
    }
  }
`
export const QUERY_GET_USER_BADGES = gql`
  query UserBadges($input: BadgesGetInput!) {
    userBadges(input: $input) {
      badge {
        name
        thumb
        uniqueName
        image
        id
        description
        createdAt
      }
      userId
      updatedAt
      status
      id
      fundingTxId
      createdAt
      badgeAwardEventId
    }
  }
`

/*
Input
{
  "input": {
    "where": {
      "fundingTxId": null,
      "userId": null
    }
  }
}
*/
