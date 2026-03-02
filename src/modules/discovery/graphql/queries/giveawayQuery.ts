import { gql } from '@apollo/client'

export const QUERY_ACELERANDO_VIP_LEADERBOARD = gql`
  query AcelerandoVipLeaderboard {
    acelerandoVipLeaderboard {
      giveawayId
      updatedAt
      startAt
      endAt
      timezone
      leaderboardSize
      topCutoffScore
      entries {
        rank
        userId
        displayName
        avatarUrl
        scoreSats
        eligibleContributionsCount
        uniqueProjectsBacked
      }
    }
  }
`

export const QUERY_ACELERANDO_VIP_MY_POSITION = gql`
  query AcelerandoVipMyPosition {
    acelerandoVipMyPosition {
      userId
      rank
      scoreSats
      inTop3
      top3CutoffScore
      distanceToTop3Sats
      distanceToNextRankSats
      progressToTop3
      eligibleContributionsCount
      uniqueProjectsBacked
      excludedSelfContributionsCount
    }
  }
`
