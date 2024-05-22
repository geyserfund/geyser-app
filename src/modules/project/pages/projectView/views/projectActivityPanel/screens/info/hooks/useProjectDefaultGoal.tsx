import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

import { QUERY_PROJECT_DEFAULT_GOAL } from '../../../../../../../../../graphql/queries/goals'
import { ProjectGoal, ProjectGoalCurrency, ProjectGoals } from '../../../../../../../../../types'
import { useProjectContext } from '../../../../../../../context'
import { useCurrencyFormatter } from '../../../../../../projectView/hooks/useCurrencyFormatter'

type ResponseData = {
  projectGoals: ProjectGoals
}

export const useProjectDefaultGoal = () => {
  const { project } = useProjectContext()

  const { data, loading } = useQuery<ResponseData>(QUERY_PROJECT_DEFAULT_GOAL, {
    variables: { projectId: project?.id },
  })

  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

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
    return formatAmount(project?.balanceUsdCent ?? 0, ProjectGoalCurrency.Usdcent)
  }, [formatAmount, project?.balanceUsdCent])

  const formattedSatsAmount = useCallback(() => {
    return formatSatsAmount(priorityGoal?.amountContributed ?? 0)
  }, [formatSatsAmount, priorityGoal?.amountContributed])

  return {
    priorityGoal,
    loading,
    project,
    formattedUsdAmount,
    formattedTotalUsdAmount,
    formattedSatsAmount,
  }
}
