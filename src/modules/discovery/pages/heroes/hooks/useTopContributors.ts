import { QueryHookOptions } from '@apollo/client'
import { useState } from 'react'

import {
  GlobalContributorLeaderboardRow,
  LeaderboardGlobalContributorsQuery,
  LeaderboardGlobalContributorsQueryVariables,
  LeaderboardPeriod,
  useLeaderboardGlobalContributorsQuery,
} from '@/types'

export const useTopContributors = (
  period: LeaderboardPeriod,
  top: number,
  options?: QueryHookOptions<LeaderboardGlobalContributorsQuery, LeaderboardGlobalContributorsQueryVariables>,
) => {
  const [contributors, setContributors] = useState<GlobalContributorLeaderboardRow[]>([])
  const { loading } = useLeaderboardGlobalContributorsQuery({
    variables: { input: { period, top } },
    ...options,
    onCompleted(data) {
      setContributors(data.leaderboardGlobalContributorsGet)
      if (options?.onCompleted) options.onCompleted(data)
    },
  })

  return { contributors, loading }
}
