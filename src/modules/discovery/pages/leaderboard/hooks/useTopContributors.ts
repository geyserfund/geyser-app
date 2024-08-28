import { useState } from 'react'

import { GlobalContributorLeaderboardRow, LeaderboardPeriod, useLeaderboardGlobalContributorsQuery } from '@/types'

export const useTopContributors = (period: LeaderboardPeriod, top: number) => {
  const [contributors, setContributors] = useState<GlobalContributorLeaderboardRow[]>([])
  const { loading } = useLeaderboardGlobalContributorsQuery({
    variables: { input: { period, top } },
    onCompleted(data) {
      setContributors(data.leaderboardGlobalContributorsGet)
    },
  })

  return { contributors, loading }
}
