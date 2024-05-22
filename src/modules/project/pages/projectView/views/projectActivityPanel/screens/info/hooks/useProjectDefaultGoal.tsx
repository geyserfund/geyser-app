import { useCallback, useEffect, useState } from 'react'

import { ProjectGoal, ProjectGoalCurrency } from '../../../../../../../../../types'
import { useCurrencyFormatter } from '../../../../../../projectView/hooks/useCurrencyFormatter'

type Props = {
  defaultGoalId: string | null
  balanceUsdCent: number | null
  inProgressGoals: ProjectGoal[] | null | undefined
}

export const useProjectDefaultGoal = ({ defaultGoalId, balanceUsdCent, inProgressGoals }: Props) => {
  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const [priorityGoal, setPriorityGoal] = useState<ProjectGoal>()

  useEffect(() => {
    if (!defaultGoalId || !balanceUsdCent || !inProgressGoals) return

    const goalToDisplay = inProgressGoals.find((goal) => goal.id === defaultGoalId)

    setPriorityGoal(goalToDisplay as ProjectGoal)
  }, [defaultGoalId, balanceUsdCent, inProgressGoals])

  const formattedUsdAmount = useCallback(() => {
    return formatUsdAmount(priorityGoal?.amountContributed ?? 0)
  }, [formatUsdAmount, priorityGoal?.amountContributed])

  const formattedTotalUsdAmount = useCallback(() => {
    return formatAmount(balanceUsdCent ?? 0, ProjectGoalCurrency.Usdcent)
  }, [formatAmount, balanceUsdCent])

  const formattedSatsAmount = useCallback(() => {
    return formatSatsAmount(priorityGoal?.amountContributed ?? 0)
  }, [formatSatsAmount, priorityGoal?.amountContributed])

  return {
    priorityGoal,
    formattedUsdAmount,
    formattedTotalUsdAmount,
    formattedSatsAmount,
  }
}
