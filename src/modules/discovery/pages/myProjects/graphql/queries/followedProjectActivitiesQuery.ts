import { gql } from '@apollo/client'

import { FOLLOWED_PROJECTS_ACTIVITIES_COUNT_FRAGMENT } from '../fragments/followedProjectsActivitiesFragment'

export const FOLLOWED_PROJECTS_ACTIVITIES_QUERY = gql`
  ${FOLLOWED_PROJECTS_ACTIVITIES_COUNT_FRAGMENT}

  query ActivitiesCountGroupedByProject($input: ActivitiesCountGroupedByProjectInput!) {
    activitiesCountGroupedByProject(input: $input) {
      ...FollowedProjectsActivitiesCountFragment
    }
  }
`
