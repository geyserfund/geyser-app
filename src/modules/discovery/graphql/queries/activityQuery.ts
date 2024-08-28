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
