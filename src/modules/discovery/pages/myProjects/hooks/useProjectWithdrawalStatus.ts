import { useMemo } from 'react'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { MIN_BITCOIN_PAYOUT_SATS } from '@/modules/project/constants/payout.ts'
import { useRootstockBalance } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/useRootstockBalance.ts'
import { isLegacyTiaProject } from '@/shared/utils/project/isLegacyTiaProject.ts'
import { ProjectForMyProjectsFragment, Satoshis } from '@/types'

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
  const isTiaProject = isLegacyTiaProject(project)

  const { balance, isLoading } = useRootstockBalance({ rskAddress: projectRskEoa })

  const withdrawableSats = balance ? Number(balance / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100

  const status: WithdrawalStatusType = useMemo(() => {
    if (!isTiaProject || !projectRskEoa) {
      return 'unavailable'
    }

    if (balance === null || balance === 0n) {
      return 'no_funds'
    }

    if (withdrawableSats < MIN_BITCOIN_PAYOUT_SATS) {
      return 'below_threshold'
    }

    return 'ready'
  }, [balance, isTiaProject, projectRskEoa, withdrawableSats])

  return {
    status,
    withdrawableSats,
    withdrawableUsd,
    isLoading,
  }
}
