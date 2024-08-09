import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { GlobalContributorLeaderboardRow, LeaderboardPeriod } from '@/types'

import { QUERY_LEADERBOARD_GLOBAL_CONTRIBUTORS } from '../graphql/queries/topContributorsQuery'

export const useTopContributors = (period: LeaderboardPeriod) => {
  const [contributors, setContributors] = useState<GlobalContributorLeaderboardRow[]>([])
  useQuery(QUERY_LEADERBOARD_GLOBAL_CONTRIBUTORS, {
    variables: { input: { period, top: 20 } },
    onCompleted(data) {
      setContributors(data.leaderboardGlobalContributorsGet)
    },
  })

  return { contributors }
}
