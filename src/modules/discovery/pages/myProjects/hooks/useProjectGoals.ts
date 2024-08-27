import { useAtomValue } from 'jotai'
import { useMemo, useState } from 'react'

import { ProjectGoal, useProjectGoalsQuery } from '@/types'
import { useNotification } from '@/utils'

import { periodAtom } from '../state/periodAtom'

export const useProjectGoals = (projectId: string) => {
  const period = useAtomValue(periodAtom)

  const { toast } = useNotification()
  const [goals, setGoals] = useState<ProjectGoal[]>([])

  const dateRange = useMemo(() => {
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const oneMonthAgo = new Date()
    oneMonthAgo.setDate(oneMonthAgo.getDate() - 30)

    return {
      endDateTime: Date.now(),
      startDateTime: period === 'week' ? oneWeekAgo.getTime() : oneMonthAgo.getTime(),
    }
  }, [period])

  const { loading, error } = useProjectGoalsQuery({
    variables: {
      input: {
        projectId,
        receivedContributionsInDatetimeRange: dateRange,
      },
    },
    onCompleted(data) {
      setGoals([...data.projectGoals.inProgress, ...data.projectGoals.completed])
    },
    onError(error) {
      toast({
        status: 'error',
        title: 'Failed to fetch project goals',
        description: `${error.message}`,
      })
    },
  })

  return {
    goals,
    isLoading: loading,
    error,
  }
}
