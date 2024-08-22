import { gql } from '@apollo/client'

export const FRAGMENT_PROJECT_FOR_PROFILE_PAGE = gql`
  fragment ProjectForProfilePage on Project {
    id
    name
    balance
    fundersCount
    thumbnailImage
    title
    shortDescription
    createdAt
    status
    wallets {
      id
      name
      state {
        status
        statusCode
      }
    }
  }
`
