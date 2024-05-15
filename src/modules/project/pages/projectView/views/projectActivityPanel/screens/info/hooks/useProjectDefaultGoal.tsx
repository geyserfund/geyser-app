import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

import { QUERY_PROJECT_DEFAULT_GOAL } from '../../../../../../../../../graphql/queries/goals'
import { ProjectGoal, ProjectGoals } from '../../../../../../../../../types'
import { useProjectContext } from '../../../../../../../context'
import { useCurrencyFormatter } from '../../../../../../projectView/hooks/useCurrencyFormatter'

type ResponseData = {
  projectGoals: ProjectGoals
}

export const useProjectDefaultGoal = () => {
  const { project } = useProjectContext()

  const { data } = useQuery<ResponseData>(QUERY_PROJECT_DEFAULT_GOAL, {
    variables: { projectId: project?.id },
  })

  const { formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const projectGoals = data?.projectGoals

  const [priorityGoal, setPriorityGoal] = useState<ProjectGoal>()

  useEffect(() => {
    if (!project || !project.defaultGoalId || !projectGoals?.inProgress) return

    const inProgressGoals = projectGoals?.inProgress || []

    const goalToDisplay = inProgressGoals.find((goal) => goal.id === project.defaultGoalId)

    setPriorityGoal(goalToDisplay as ProjectGoal)
  }, [project, projectGoals])

  const formattedUsdAmount = useCallback(() => {
    return formatUsdAmount(priorityGoal?.amountContributed ?? 0)
  }, [formatUsdAmount, priorityGoal?.amountContributed])

  const formattedTotalUsdAmount = useCallback(() => {
    return formatUsdAmount(project?.balance ?? 0)
  }, [formatUsdAmount, project?.balance])

  const formattedSatsAmount = useCallback(() => {
    return formatSatsAmount(priorityGoal?.amountContributed ?? 0)
  }, [formatSatsAmount, priorityGoal?.amountContributed])

  return {
    priorityGoal,
    project,
    formattedUsdAmount,
    formattedTotalUsdAmount,
    formattedSatsAmount,
  }
}
