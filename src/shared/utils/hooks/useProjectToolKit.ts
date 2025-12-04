import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { ProjectAonGoalStatus, ProjectForLandingPageFragment, Satoshis } from '@/types/index.ts'

import { centsToDollars } from '../../../utils/index.ts'
import { isActive, isAllOrNothing } from '../../../utils/validations/project.ts'

export const useProjectToolkit = (
  project: Pick<ProjectForLandingPageFragment, 'balance' | 'balanceUsdCent' | 'aonGoal' | 'fundingStrategy' | 'status'>,
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

  const isFundingDisabled = () => {
    const isAon = isAllOrNothing(project)
    const isAonActive = isAon && project.aonGoal?.status === ProjectAonGoalStatus.Active

    if (isAon && isAonActive) {
      return true
    }

    return !isActive(project.status)
  }

  return {
    getProjectBalance,
    getAonGoalPercentage,
    isFundingDisabled,
  }
}
