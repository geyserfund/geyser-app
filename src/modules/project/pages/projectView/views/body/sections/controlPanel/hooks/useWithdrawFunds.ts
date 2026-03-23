import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useState } from 'react'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { MIN_BITCOIN_PAYOUT_USD } from '@/modules/project/constants/payout.ts'
import { QUERY_PAYOUT_LATEST } from '@/modules/project/graphql/query/payoutQuery.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { PaymentStatus, PayoutStatus, ProjectFundingStrategy, Satoshis } from '@/types'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const ACTIVE_WITHDRAW_PAYOUT_STATUSES = [PayoutStatus.Pending, PayoutStatus.Processing]
const LATEST_PAYOUT_POLL_INTERVAL_MS = 10_000

type PayoutLatestQueryResult = {
  payoutLatest?: {
    payout?: {
      status?: PayoutStatus | null
      payments?: Array<{
        status?: PaymentStatus | null
        createdAt: string
      }> | null
    } | null
  } | null
}

export const useWithdrawFunds = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const { getUSDCentsAmount } = useBTCConverter()
  const [hasOngoingWithdraw, setHasOngoingWithdraw] = useState(false)
  const [hasFailedWithdraw, setHasFailedWithdraw] = useState(false)

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
    showWithdrawableBalance &&
    !isBelowMinWithdrawThreshold &&
    (hasOngoingWithdraw || hasFailedWithdraw || hasWithdrawableBalance)

  const shouldTrackLatestPayout = isProjectOwner && isTiaProject && Boolean(projectRskEoa)
  const {
    data: latestPayoutData,
    refetch: refetchLatestPayout,
    startPolling,
    stopPolling,
  } = useQuery<PayoutLatestQueryResult>(QUERY_PAYOUT_LATEST, {
    variables: { projectId: project.id },
    skip: !shouldTrackLatestPayout,
    fetchPolicy: 'network-only',
  })

  const latestPayout = latestPayoutData?.payoutLatest?.payout
  const latestPayment = useMemo(
    () =>
      [...(latestPayout?.payments ?? [])].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0],
    [latestPayout?.payments],
  )

  useEffect(() => {
    if (!shouldTrackLatestPayout) {
      stopPolling()
      setHasOngoingWithdraw(false)
      setHasFailedWithdraw(false)
      return
    }

    const status = latestPayout?.status
    setHasOngoingWithdraw(Boolean(status && ACTIVE_WITHDRAW_PAYOUT_STATUSES.includes(status)))
    setHasFailedWithdraw(Boolean(status === PayoutStatus.Failed && latestPayment?.status === PaymentStatus.Refunded))
  }, [latestPayment?.status, latestPayout?.status, shouldTrackLatestPayout, stopPolling])

  useEffect(() => {
    if (!shouldTrackLatestPayout) {
      return
    }

    const shouldPoll = !latestPayoutData || hasOngoingWithdraw

    if (shouldPoll) {
      startPolling(LATEST_PAYOUT_POLL_INTERVAL_MS)
    } else {
      stopPolling()
    }

    return () => {
      stopPolling()
    }
  }, [hasOngoingWithdraw, latestPayoutData, shouldTrackLatestPayout, startPolling, stopPolling])

  const onCompleted = () => {
    setHasOngoingWithdraw(false)
    setHasFailedWithdraw(false)
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
    refetchWithdrawable().catch(() => undefined)
    refetchLatestPayout().catch(() => undefined)
  }

  return {
    payoutRskModal,
    projectRskEoa,
    withdrawableSats,
    withdrawableUsd,
    showWithdrawableBalance,
    isBelowMinWithdrawThreshold,
    hasOngoingWithdraw,
    hasFailedWithdraw,
    showWithdraw,
    onCompleted,
  }
}
