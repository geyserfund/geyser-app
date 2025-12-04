import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { ProjectAonGoalStatus, ProjectForLandingPageFragment, Satoshis } from '@/types/index.ts'

import { centsToDollars } from '../../../utils/index.ts'
import { isAllOrNothing } from '../../../utils/validations/project.ts'

export const useProjectBalance = (
  project: Pick<ProjectForLandingPageFragment, 'balance' | 'balanceUsdCent' | 'aonGoal' | 'fundingStrategy'>,
) => {
  const { getUSDCentsAmount } = useBTCConverter()

  const getProjectBalance = () => {
    const isAon = isAllOrNothing(project)
    const isAonFinalized = isAon && project.aonGoal?.status === ProjectAonGoalStatus.Finalized
    if (isAon && !isAonFinalized && project.aonGoal) {
      return {
        sats: project.aonGoal.balance,
        usdCents: getUSDCentsAmount(project.aonGoal.balance as Satoshis),
        usd: getUSDCentsAmount(project.aonGoal.balance as Satoshis),
      }
    }

    return {
      sats: project.balance,
      usdCents: project.balanceUsdCent,
      usd: centsToDollars(project.balanceUsdCent),
    }
  }

  const getAonGoalPercentage = () => {
    const isAon = isAllOrNothing(project)

    if (!isAon) {
      return 0
    }

    const balance = getProjectBalance()

    if (balance.sats && project.aonGoal?.goalAmount) {
      return Math.round((balance.sats / project.aonGoal.goalAmount) * 100)
    }

    return 0
  }

  return {
    getProjectBalance,
    getAonGoalPercentage,
  }
}
