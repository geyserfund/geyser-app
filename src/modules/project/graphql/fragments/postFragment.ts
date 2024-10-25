import { gql } from '@apollo/client'

import { FRAGMENT_PROJECT_GOALS } from './goalsFragment'
import { FRAGMENT_POST_PAGE_PROJECT_REWARD } from './rewardsFragment'
import { FRAGMENT_PROJECT_PAGE_CREATOR } from './userFragment'

export const FRAGMENT_PROJECT_POST = gql`
  ${FRAGMENT_PROJECT_PAGE_CREATOR}
  fragment ProjectPost on Post {
    id
    title
    description
    image
    postType
    fundersCount
    amountFunded
    status
    createdAt
    publishedAt
    sentByEmailAt
  }
`

export const FRAGMENT_PROJECT_POST_VIEW = gql`
  ${FRAGMENT_PROJECT_GOALS}
  ${FRAGMENT_POST_PAGE_PROJECT_REWARD}
  fragment ProjectPostView on Post {
    id
    title
    description
    image
    postType
    fundersCount
    amountFunded
    status
    createdAt
    publishedAt
    markdown
    sentByEmailAt
    projectRewards {
      ...PostPageProjectReward
    }
    projectGoals {
      inProgress {
        ...ProjectGoals
      }
    }
  }
`
