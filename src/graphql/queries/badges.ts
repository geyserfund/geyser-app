import { gql } from '@apollo/client'

export const BADGES_QUERY = gql`
  query Badges {
    badges {
      id
      createdAt
      description
      image
      name
      uniqueName
    }
  }
`
