import { useQuery } from '@apollo/client'
import { useMemo, useState } from 'react'

import { useNotification } from '@/utils'

import { QUERY_PROJECT_STATS_GET } from '../graphql/queries/projectContributionsStatsQuery'

interface ProjectStats {
  total: number
  totalUsd: number
}

export const useProjectStats = (projectId: string) => {
  const { toast } = useNotification()

  const [stats, setStats] = useState<ProjectStats | null>(null)

  const dateRange = useMemo(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    return {
      endDateTime: Date.now(),
      startDateTime: oneWeekAgo.getTime(),
    }
  }, [])

  // TODO: replace with useProjectStatsQuery
  const { loading, error } = useQuery(QUERY_PROJECT_STATS_GET, {
    variables: {
      input: {
        where: {
          projectId,
          dateRange,
        },
      },
    },
    onCompleted(data) {
      const { contributions } = data.projectStatsGet.current.projectContributionsStats
      setStats({
        total: contributions.total,
        totalUsd: contributions.totalUsd,
      })
    },
    onError(error) {
      toast({
        status: 'error',
        title: 'Failed to fetch project stats',
        description: `${error.message}`,
      })
      return null
    },
  })

  return {
    stats,
    isLoading: loading,
    error,
  }
}
