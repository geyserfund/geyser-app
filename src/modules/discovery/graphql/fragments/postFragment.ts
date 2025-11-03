import { gql } from '@apollo/client'

export const FRAGMENT_POST_FOR_LANDING_PAGE = gql`
  fragment PostForLandingPage on Post {
    id
    postType
    publishedAt
    title
    image
    description
    project {
      title
      name
      id
      thumbnailImage
      owners {
        id
        user {
          id
          imageUrl
          username
          heroId
          guardianType
        }
      }
    }
  }
`
