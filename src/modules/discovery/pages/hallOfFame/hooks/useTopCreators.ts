import { QueryHookOptions } from '@apollo/client'
import { useState } from 'react'

import {
  GlobalCreatorLeaderboardRow,
  LeaderboardGlobalCreatorsGetQuery,
  LeaderboardGlobalCreatorsGetQueryVariables,
  LeaderboardPeriod,
  useLeaderboardGlobalCreatorsGetQuery,
} from '@/types'

export const useTopCreators = (
  period: LeaderboardPeriod,
  top: number,
  options?: QueryHookOptions<LeaderboardGlobalCreatorsGetQuery, LeaderboardGlobalCreatorsGetQueryVariables>,
) => {
  const [creators, setCreators] = useState<GlobalCreatorLeaderboardRow[]>([])
  const { loading } = useLeaderboardGlobalCreatorsGetQuery({
    variables: { input: { period, top } },
    ...options,
    onCompleted(data) {
      setCreators(data.leaderboardGlobalCreatorsGet)
      if (options?.onCompleted) options.onCompleted(data)
    },
  })

  return { creators, loading }
}
