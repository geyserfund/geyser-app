import { useApolloClient } from '@apollo/client'
import { useCallback, useEffect, useState } from 'react'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { MIN_BITCOIN_PAYOUT_USD } from '@/modules/project/constants/payout.ts'
import { QUERY_PAYOUT_ACTIVE } from '@/modules/project/graphql/query/payoutQuery.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { PayoutStatus, ProjectFundingStrategy, Satoshis } from '@/types'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const ACTIVE_WITHDRAW_PAYOUT_STATUSES = [PayoutStatus.Pending, PayoutStatus.Processing]

export const useWithdrawFunds = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const { getUSDCentsAmount } = useBTCConverter()
  const apolloClient = useApolloClient()
  const [hasOngoingWithdraw, setHasOngoingWithdraw] = useState(false)

  const projectRskEoa = project?.rskEoa || ''
  const { withdrawable, isLoading, refetch: refetchWithdrawable } = usePrismWithdrawable({ rskAddress: projectRskEoa })

  const withdrawableSats = withdrawable ? Number(withdrawable / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100

  const isTiaProject = project?.fundingStrategy === ProjectFundingStrategy.TakeItAll
  const showWithdrawableBalance = isTiaProject && Boolean(projectRskEoa) && !isLoading
  const hasWithdrawableBalance = withdrawable !== null && withdrawable > 0n
  const isBelowMinWithdrawThreshold = withdrawableUsd < MIN_BITCOIN_PAYOUT_USD
  const showWithdraw =
    showWithdrawableBalance && !isBelowMinWithdrawThreshold && (hasOngoingWithdraw || hasWithdrawableBalance)

  const refetchActivePayout = useCallback(() => {
    return apolloClient
      .query({
        query: QUERY_PAYOUT_ACTIVE,
        variables: { projectId: project.id },
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => {
        const status = data?.payoutActive?.payout?.status
        setHasOngoingWithdraw(Boolean(status && ACTIVE_WITHDRAW_PAYOUT_STATUSES.includes(status)))
      })
      .catch(() => {
        setHasOngoingWithdraw(false)
      })
  }, [apolloClient, project.id])

  useEffect(() => {
    if (!isProjectOwner || !isTiaProject || !projectRskEoa) {
      setHasOngoingWithdraw(false)
      return
    }

    refetchActivePayout().catch(() => undefined)
  }, [isProjectOwner, isTiaProject, project.id, projectRskEoa, refetchActivePayout])

  const onCompleted = () => {
    setHasOngoingWithdraw(false)
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
    refetchWithdrawable().catch(() => undefined)
    refetchActivePayout().catch(() => undefined)
  }

  return {
    payoutRskModal,
    projectRskEoa,
    withdrawableSats,
    withdrawableUsd,
    showWithdrawableBalance,
    isBelowMinWithdrawThreshold,
    hasOngoingWithdraw,
    showWithdraw,
    onCompleted,
  }
}
