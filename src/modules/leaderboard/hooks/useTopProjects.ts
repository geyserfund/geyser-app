import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { GlobalProjectLeaderboardRow, LeaderboardPeriod } from '@/types'

import { QUERY_LEADERBOARD_GLOBAL_PROJECTS } from '../graphql/queries/topProjectsQuery'

export const useTopProjects = (period: LeaderboardPeriod, top = 20) => {
  const [projects, setProjects] = useState<GlobalProjectLeaderboardRow[]>([])
  const { loading } = useQuery(QUERY_LEADERBOARD_GLOBAL_PROJECTS, {
    variables: { input: { period, top } },
    onCompleted(data) {
      setProjects(data.leaderboardGlobalProjectsGet)
    },
  })

  return { projects, loading }
}
