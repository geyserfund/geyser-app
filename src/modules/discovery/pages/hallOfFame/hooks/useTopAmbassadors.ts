import { QueryHookOptions } from '@apollo/client'
import { useState } from 'react'

import {
  GlobalAmbassadorLeaderboardRow,
  LeaderboardGlobalAmbassadorsGetQuery,
  LeaderboardGlobalAmbassadorsGetQueryVariables,
  LeaderboardPeriod,
  useLeaderboardGlobalAmbassadorsGetQuery,
} from '@/types'

export const useTopAmbassadors = (
  period: LeaderboardPeriod,
  top: number,
  options?: QueryHookOptions<LeaderboardGlobalAmbassadorsGetQuery, LeaderboardGlobalAmbassadorsGetQueryVariables>,
) => {
  const [ambassadors, setAmbassadors] = useState<GlobalAmbassadorLeaderboardRow[]>([])
  const { loading } = useLeaderboardGlobalAmbassadorsGetQuery({
    variables: { input: { period, top } },
    ...options,
    onCompleted(data) {
      setAmbassadors(data.leaderboardGlobalAmbassadorsGet)
      if (options?.onCompleted) options.onCompleted(data)
    },
  })

  return { ambassadors, loading }
}
