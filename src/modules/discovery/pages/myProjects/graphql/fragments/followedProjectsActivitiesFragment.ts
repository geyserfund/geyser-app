import { gql } from '@apollo/client'

export const FOLLOWED_PROJECTS_ACTIVITIES_COUNT_FRAGMENT = gql`
  fragment FollowedProjectsActivitiesCountFragment on ProjectActivitiesCount {
    count
    project {
      id
      name
      thumbnailImage
      title
    }
  }
`
