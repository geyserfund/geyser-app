import { useCallback, useEffect, useState } from 'react'

import { useCurrencyFormatter } from '../../../../../../../shared/utils/hooks/useCurrencyFormatter'
import { ProjectGoalCurrency, ProjectGoalFragment } from '../../../../../../../types'

type Props = {
  defaultGoalId: string | null
  balanceUsdCent: number | null
  inProgressGoals: ProjectGoalFragment[] | null | undefined
}

export const useProjectDefaultGoal = ({ defaultGoalId, balanceUsdCent, inProgressGoals }: Props) => {
  const { formatAmount, formatUsdAmount, formatSatsAmount } = useCurrencyFormatter()

  const [priorityGoal, setPriorityGoal] = useState<ProjectGoalFragment>()

  useEffect(() => {
    if (!inProgressGoals || inProgressGoals?.length === 0) return

    const goalToDisplay = inProgressGoals[0]

    setPriorityGoal(goalToDisplay as ProjectGoalFragment)
  }, [defaultGoalId, inProgressGoals])

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
