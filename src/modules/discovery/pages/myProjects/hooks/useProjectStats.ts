import { useMemo, useState } from 'react'

import { useProjectStatsGetQuery } from '@/types'
import { useNotification } from '@/utils'

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

  const { loading, error } = useProjectStatsGetQuery({
    variables: {
      input: {
        where: {
          projectId,
          dateRange,
        },
      },
    },
    onCompleted(data) {
      const contributions = data.projectStatsGet.current?.projectContributionsStats?.contributions
      setStats({
        total: contributions?.total ?? 0,
        totalUsd: contributions?.totalUsd ?? 0,
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
