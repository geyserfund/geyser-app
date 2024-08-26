import { useState } from 'react'

import { GlobalProjectLeaderboardRow, LeaderboardPeriod, useLeaderboardGlobalProjectsQuery } from '@/types'

export const useTopProjects = (period: LeaderboardPeriod, top = 20) => {
  const [projects, setProjects] = useState<GlobalProjectLeaderboardRow[]>([])
  const { loading } = useLeaderboardGlobalProjectsQuery({
    variables: { input: { period, top } },
    onCompleted(data) {
      setProjects(data.leaderboardGlobalProjectsGet)
    },
  })

  return { projects, loading }
}
