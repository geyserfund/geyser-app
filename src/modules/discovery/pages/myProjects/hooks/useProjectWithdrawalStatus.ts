import { useMemo } from 'react'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { ProjectForMyProjectsFragment, ProjectFundingStrategy, Satoshis } from '@/types'

export type WithdrawalStatusType = 'no_funds' | 'below_threshold' | 'ready' | 'unavailable'

type UseProjectWithdrawalStatusProps = {
  project: ProjectForMyProjectsFragment
}

type UseProjectWithdrawalStatusReturn = {
  status: WithdrawalStatusType
  withdrawableSats: number
  withdrawableUsd: number
  isLoading: boolean
}

export const useProjectWithdrawalStatus = ({
  project,
}: UseProjectWithdrawalStatusProps): UseProjectWithdrawalStatusReturn => {
  const { getUSDCentsAmount } = useBTCConverter()

  const projectRskEoa = project?.rskEoa || ''
  const isTiaProject = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll

  const { withdrawable, isLoading } = usePrismWithdrawable({ rskAddress: projectRskEoa })

  const withdrawableSats = withdrawable ? Number(withdrawable / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100

  const status: WithdrawalStatusType = useMemo(() => {
    if (!isTiaProject || !projectRskEoa) {
      return 'unavailable'
    }

    if (withdrawable === null || withdrawable === 0n) {
      return 'no_funds'
    }

    if (withdrawableUsd < 10) {
      return 'below_threshold'
    }

    return 'ready'
  }, [isTiaProject, projectRskEoa, withdrawable, withdrawableUsd])

  return {
    status,
    withdrawableSats,
    withdrawableUsd,
    isLoading,
  }
}
