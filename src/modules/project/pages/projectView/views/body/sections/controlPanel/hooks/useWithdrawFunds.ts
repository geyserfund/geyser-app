import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { ProjectFundingStrategy, Satoshis } from '@/types'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

export const useWithdrawFunds = () => {
  const { project } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const { getUSDCentsAmount } = useBTCConverter()

  const projectRskEoa = project?.rskEoa || ''
  const { withdrawable, isLoading } = usePrismWithdrawable({ rskAddress: projectRskEoa })

  const withdrawableSats = withdrawable ? Number(withdrawable / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100

  const isTiaProject = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll
  const hasWithdrawable = withdrawable !== null && withdrawable > 0n && withdrawableUsd >= 1
  const showWithdraw = isTiaProject && Boolean(projectRskEoa) && !isLoading && hasWithdrawable

  const onCompleted = () => {
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
  }

  return {
    payoutRskModal,
    projectRskEoa,
    withdrawableSats,
    withdrawableUsd,
    showWithdraw,
    onCompleted,
  }
}
