import { useQuery } from '@apollo/client'
import { useState } from 'react'

import { QUERY_PROJECT_GOALS } from '../../../../../graphql/queries/goals'
import { ProjectGoal, ProjectGoals } from '../../../../../types'

type ResponseData = {
  projectGoals: ProjectGoals
}

export const useProjectGoals = (projectId: string | number | undefined) => {
  const [inProgressGoals, setInProgressGoals] = useState<ProjectGoal[]>()
  const [completedGoals, setCompletedGoals] = useState<ProjectGoal[]>()
  const [hasGoals, setHasGoals] = useState(false)

  const { refetch } = useQuery<ResponseData>(QUERY_PROJECT_GOALS, {
    variables: { projectId },
    notifyOnNetworkStatusChange: true,
    onCompleted(data) {
      const projectGoals = data?.projectGoals

      setInProgressGoals(projectGoals.inProgress || [])
      setCompletedGoals(projectGoals.completed || [])

      if (
        (projectGoals.inProgress && projectGoals.inProgress.length > 0) ||
        (projectGoals.completed && projectGoals.completed.length > 0)
      ) {
        setHasGoals(true)
      }
    },
  })

  return {
    hasGoals,
    inProgressGoals,
    completedGoals,
    refetch,
  }
}
