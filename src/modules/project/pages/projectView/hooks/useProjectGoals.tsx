import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

import { QUERY_PROJECT_GOALS } from '../../../../../graphql/queries/goals'
import { ProjectGoal, ProjectGoals } from '../../../../../types'
import { useProjectContext } from '../../../context'

type ResponseData = {
  projectGoals: ProjectGoals
}

export const useProjectGoals = () => {
  const { project } = useProjectContext()

  const { data, refetch } = useQuery<ResponseData>(QUERY_PROJECT_GOALS, {
    variables: { projectId: project?.id },
  })

  const projectGoals = data?.projectGoals

  const [inProgressGoals, setInProgressGoals] = useState<ProjectGoal[]>()
  const [completedGoals, setCompletedGoals] = useState<ProjectGoal[]>()
  const [hasGoals, setHasGoals] = useState(false)

  useEffect(() => {
    if (projectGoals?.inProgress && projectGoals.inProgress.length > 0) {
      setInProgressGoals(projectGoals.inProgress)
    }
  }, [projectGoals?.inProgress])

  useEffect(() => {
    if (projectGoals?.completed && projectGoals.completed.length > 0) {
      setCompletedGoals(projectGoals.completed)
    }
  }, [projectGoals?.completed])

  useEffect(() => {
    if (inProgressGoals || completedGoals) {
      setHasGoals(true)
    }
  }, [inProgressGoals, completedGoals])

  return {
    hasGoals,
    inProgressGoals,
    completedGoals,
    refetch,
  }
}
