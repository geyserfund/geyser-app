import { gql } from '@apollo/client'

import { ACTIVITY_FEED_FRAGMENT } from '../fragments/activityFeedFragment'

export const QUERY_ACTIVITY_FEED = gql`
  ${ACTIVITY_FEED_FRAGMENT}
  query ActivityFeed($input: GetActivitiesInput!) {
    activitiesGet(input: $input) {
      activities {
        ...ActivityFeedFragment
      }
      pagination {
        take
        cursor {
          id
        }
        count
      }
    }
  }
`
