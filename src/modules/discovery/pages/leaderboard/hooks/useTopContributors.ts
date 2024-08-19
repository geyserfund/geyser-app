import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { GlobalContributorLeaderboardRow, LeaderboardPeriod } from '@/types'

import { QUERY_LEADERBOARD_GLOBAL_CONTRIBUTORS } from '../graphql/queries/topContributorsQuery'

export const useTopContributors = (period: LeaderboardPeriod, top: number) => {
  const [contributors, setContributors] = useState<GlobalContributorLeaderboardRow[]>([])
  const { loading } = useQuery(QUERY_LEADERBOARD_GLOBAL_CONTRIBUTORS, {
    variables: { input: { period, top } },
    onCompleted(data) {
      setContributors(data.leaderboardGlobalContributorsGet)
    },
  })

  return { contributors, loading }
}
