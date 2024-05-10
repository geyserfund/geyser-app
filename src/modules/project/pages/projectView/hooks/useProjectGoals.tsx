import { useQuery } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

import { QUERY_PROJECT_GOAL_TO_DISPLAY } from '../../../../../graphql/queries/goals'
import { useBTCConverter } from '../../../../../helpers'
import { Satoshis, USDCents } from '../../../../../types'
import { ProjectGoal, ProjectGoals } from '../../../../../types'
import { commaFormatted } from '../../../../../utils'
import { useProjectContext } from '../../../context'

type ResponseData = {
  projectGoals: ProjectGoals
}

export const useProjectGoals = () => {
  const { project } = useProjectContext()

  const { data } = useQuery<ResponseData>(QUERY_PROJECT_GOAL_TO_DISPLAY, {
    variables: { projectId: project?.id },
  })

  const { getUSDAmount, getSatoshisFromUSDCents } = useBTCConverter()

  const { inProgress } = data?.projectGoals || {}

  const [priorityGoal, setPriorityGoal] = useState<ProjectGoal>()

  useEffect(() => {
    if (!project || !project.defaultGoalId || !inProgress) return

    const inProgressGoals = inProgress || []

    const goalToDisplay = inProgressGoals.find((goal) => goal.id === project.defaultGoalId)

    setPriorityGoal(goalToDisplay as ProjectGoal)
  }, [project, inProgress])

  const formattedUsdAmount = useCallback(() => {
    const amount = getUSDAmount(priorityGoal?.amountContributed as Satoshis)
    if (amount < 1) return 'less than $1'
    return `$${commaFormatted(Math.round(amount))}`
  }, [getUSDAmount, priorityGoal?.amountContributed])

  const formattedTotalUsdAmount = useCallback(() => {
    const amount = getUSDAmount(project?.balance as Satoshis)
    if (amount < 1) return 'less than $1'
    return `$${commaFormatted(Math.round(amount))}`
  }, [getUSDAmount, project?.balance])

  const formattedSatsAmount = useCallback(() => {
    const amount = getSatoshisFromUSDCents(priorityGoal?.amountContributed as USDCents)
    if (amount < 1) return 'less than 1'
    return `${commaFormatted(Math.round(amount))} sats`
  }, [getSatoshisFromUSDCents, priorityGoal?.amountContributed])

  return {
    priorityGoal,
    project,
    formattedUsdAmount,
    formattedTotalUsdAmount,
    formattedSatsAmount,
  }
}
