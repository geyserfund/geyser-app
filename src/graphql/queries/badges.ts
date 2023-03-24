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
      badgeAwardEventId
      badgeDefinitionEventId
      createdAt
      fundingTxId
      id
      status
      updatedAt
      userId
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
