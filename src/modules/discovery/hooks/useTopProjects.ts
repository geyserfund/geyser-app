import { QueryHookOptions } from '@apollo/client'
import { useState } from 'react'

import {
  GlobalProjectLeaderboardRow,
  LeaderboardGlobalProjectsQuery,
  LeaderboardGlobalProjectsQueryVariables,
  LeaderboardPeriod,
  useLeaderboardGlobalProjectsQuery,
} from '@/types'

export const useTopProjects = (
  period: LeaderboardPeriod,
  top = 20,
  options?: QueryHookOptions<LeaderboardGlobalProjectsQuery, LeaderboardGlobalProjectsQueryVariables>,
) => {
  const [projects, setProjects] = useState<GlobalProjectLeaderboardRow[]>([])
  const { loading } = useLeaderboardGlobalProjectsQuery({
    variables: { input: { period, top } },
    ...options,
    onCompleted(data) {
      setProjects(data.leaderboardGlobalProjectsGet)
      options?.onCompleted?.(data)
    },
  })

  return { projects, loading }
}
