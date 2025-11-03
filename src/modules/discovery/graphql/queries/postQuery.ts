import { gql } from '@apollo/client'

export const QUERY_FEATURED_PROJECT_FOR_LANDING_PAGE = gql`
  query ActivitiesGet($input: GetActivitiesInput) {
    activitiesGet(input: $input) {
      activities {
        id
        createdAt
        activityType
      }
    }
  }
`

export const QUERY_POSTS_FOR_LANDING_PAGE = gql`
  query PostsForLandingPage($input: GetPostsInput) {
    posts(input: $input) {
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
  }
`
