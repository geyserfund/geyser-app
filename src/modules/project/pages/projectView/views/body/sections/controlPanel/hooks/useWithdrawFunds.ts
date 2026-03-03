import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { ProjectFundingStrategy, Satoshis } from '@/types'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const MIN_WITHDRAW_USD = 10

export const useWithdrawFunds = () => {
  const { project } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const { getUSDCentsAmount } = useBTCConverter()

  const projectRskEoa = project?.rskEoa || ''
  const { withdrawable, isLoading, refetch: refetchWithdrawable } = usePrismWithdrawable({ rskAddress: projectRskEoa })

  const withdrawableSats = withdrawable ? Number(withdrawable / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100

  const isTiaProject = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll
  const showWithdrawableBalance = isTiaProject && Boolean(projectRskEoa) && !isLoading
  const hasWithdrawableBalance = withdrawable !== null && withdrawable > 0n
  const isBelowMinWithdrawThreshold = withdrawableUsd < MIN_WITHDRAW_USD
  const showWithdraw = showWithdrawableBalance && hasWithdrawableBalance && !isBelowMinWithdrawThreshold

  const onCompleted = () => {
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
    void refetchWithdrawable()
  }

  return {
    payoutRskModal,
    projectRskEoa,
    withdrawableSats,
    withdrawableUsd,
    showWithdrawableBalance,
    isBelowMinWithdrawThreshold,
    showWithdraw,
    onCompleted,
  }
}
