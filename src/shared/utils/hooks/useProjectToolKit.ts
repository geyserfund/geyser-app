import { DateTime } from 'luxon'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { ProjectAonGoalStatus, ProjectForLandingPageFragment, Satoshis } from '@/types/index.ts'

import { centsToDollars } from '../../../utils/index.ts'
import { isActive, isAllOrNothing } from '../../../utils/validations/project.ts'

const isAonFinalizedStatuses = [
  ProjectAonGoalStatus.Claimed,
  ProjectAonGoalStatus.Failed,
  ProjectAonGoalStatus.Finalized,
]

export const getIsAonActive = (project: Pick<ProjectForLandingPageFragment, 'aonGoal' | 'fundingStrategy'>) => {
  return (
    isAllOrNothing(project) &&
    (project.aonGoal?.status === ProjectAonGoalStatus.Active ||
      (project?.aonGoal?.status === ProjectAonGoalStatus.Successful &&
        project.aonGoal?.endsAt &&
        project.aonGoal.endsAt > DateTime.now().toMillis()))
  )
}

export const useProjectToolkit = (
  project: Pick<ProjectForLandingPageFragment, 'balance' | 'balanceUsdCent' | 'aonGoal' | 'fundingStrategy' | 'status'>,
) => {
  const { getUSDCentsAmount } = useBTCConverter()

  const isAon = isAllOrNothing(project)

  const isAonActive = getIsAonActive(project)

  const getProjectBalance = () => {
    const isAonFinalized = isAon && project.aonGoal?.status && isAonFinalizedStatuses.includes(project.aonGoal?.status)
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
    if (isAon) {
      if (isAonActive) {
        return false
      }

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
