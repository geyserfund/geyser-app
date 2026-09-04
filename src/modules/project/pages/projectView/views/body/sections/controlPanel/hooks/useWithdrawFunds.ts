import { useQuery } from '@apollo/client'
import { useEffect, useMemo, useRef, useState } from 'react'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { useProjectAPI } from '@/modules/project/API/useProjectAPI.ts'
import { MIN_BITCOIN_PAYOUT_SATS } from '@/modules/project/constants/payout.ts'
import { QUERY_PAYOUT_LATEST } from '@/modules/project/graphql/query/payoutQuery.ts'
import { useRootstockBalance } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/useRootstockBalance.ts'
import { useModal } from '@/shared/hooks/useModal.tsx'
import { PaymentStatus, PayoutStatus, Satoshis } from '@/types'
import { isLegacyTiaProject } from '@/shared/utils/project/isLegacyTiaProject.ts'

import { useProjectAtom } from '../../../../../../../hooks/useProjectAtom.ts'
import { useRefetchQueries } from '../../aonNotification/hooks/useRefetchQueries.ts'

const ACTIVE_WITHDRAW_PAYOUT_STATUSES = [PayoutStatus.Pending, PayoutStatus.Processing]

/** Creator still needs to act in the withdraw modal (sign, claim, etc.). */
const RESUMABLE_WITHDRAW_PAYMENT_STATUSES = [
  PaymentStatus.Unpaid,
  PaymentStatus.Claimable,
  PaymentStatus.Claiming,
]

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

const isActivePayoutStatus = (status?: PayoutStatus | null) =>
  Boolean(status && ACTIVE_WITHDRAW_PAYOUT_STATUSES.includes(status))

/**
 * "Continue withdraw" only when the creator still has a step to finish.
 * Broadcast / awaiting-confirmation (payment PENDING) is not resumable — nothing left for them to do.
 */
const isResumableWithdraw = (payoutStatus?: PayoutStatus | null, paymentStatus?: PaymentStatus | null) => {
  if (!isActivePayoutStatus(payoutStatus)) {
    return false
  }

  // Payout prepared but no payment yet — finish method selection / prepare.
  if (!paymentStatus) {
    return true
  }

  return RESUMABLE_WITHDRAW_PAYMENT_STATUSES.includes(paymentStatus)
}

export const useWithdrawFunds = () => {
  const { project, isProjectOwner } = useProjectAtom()
  const payoutRskModal = useModal()
  const { refetchQueriesOnPayoutSuccess } = useRefetchQueries()
  const { queryProject } = useProjectAPI()
  const { getUSDCentsAmount } = useBTCConverter()
  const [hasOngoingWithdraw, setHasOngoingWithdraw] = useState(false)
  const [hasFailedWithdraw, setHasFailedWithdraw] = useState(false)
  const previousPayoutStatusRef = useRef<PayoutStatus | null | undefined>(undefined)

  const projectRskEoa = project?.rskEoa || ''
  const { balance, isLoading, refetch: refetchBalance } = useRootstockBalance({ rskAddress: projectRskEoa })

  const withdrawableSats = balance ? Number(balance / 10000000000n) : 0
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats as Satoshis)
  const withdrawableUsd = withdrawableUsdCents / 100

  const isTiaProject = isLegacyTiaProject(project)
  const showWithdrawableBalance = isTiaProject && Boolean(projectRskEoa) && !isLoading
  const hasWithdrawableBalance = balance !== null && balance > 0n
  const isBelowMinWithdrawThreshold = withdrawableSats < MIN_BITCOIN_PAYOUT_SATS
  const canResumeOrRetryWithdraw = hasOngoingWithdraw || hasFailedWithdraw
  const showWithdraw =
    showWithdrawableBalance && (canResumeOrRetryWithdraw || (!isBelowMinWithdrawThreshold && hasWithdrawableBalance))

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
  const isPayoutInFlight = isActivePayoutStatus(latestPayout?.status)

  useEffect(() => {
    if (!shouldTrackLatestPayout) {
      stopPolling()
      setHasOngoingWithdraw(false)
      setHasFailedWithdraw(false)
      return
    }

    setHasOngoingWithdraw(isResumableWithdraw(latestPayout?.status, latestPayment?.status))
    setHasFailedWithdraw(
      Boolean(latestPayout?.status === PayoutStatus.Failed && latestPayment?.status === PaymentStatus.Refunded),
    )
  }, [latestPayment?.status, latestPayout?.status, shouldTrackLatestPayout, stopPolling])

  useEffect(() => {
    if (!shouldTrackLatestPayout) {
      return
    }

    // Keep polling while the payout is in flight (including post-broadcast confirmation),
    // not only while the "Continue withdraw" CTA is shown.
    const shouldPoll = !latestPayoutData || isPayoutInFlight

    if (shouldPoll) {
      startPolling(LATEST_PAYOUT_POLL_INTERVAL_MS)
    } else {
      stopPolling()
    }

    return () => {
      stopPolling()
    }
  }, [isPayoutInFlight, latestPayoutData, shouldTrackLatestPayout, startPolling, stopPolling])

  // When confirmations finish (or payout fails), refresh on-chain withdrawable without a full page reload.
  useEffect(() => {
    if (!shouldTrackLatestPayout) {
      previousPayoutStatusRef.current = latestPayout?.status
      return
    }

    const previousStatus = previousPayoutStatusRef.current
    const nextStatus = latestPayout?.status
    previousPayoutStatusRef.current = nextStatus

    if (
      previousStatus &&
      isActivePayoutStatus(previousStatus) &&
      nextStatus &&
      !isActivePayoutStatus(nextStatus)
    ) {
      refetchBalance().catch(() => undefined)
      queryProject.execute()
    }
  }, [latestPayout?.status, queryProject, refetchBalance, shouldTrackLatestPayout])

  const onCompleted = () => {
    setHasOngoingWithdraw(false)
    setHasFailedWithdraw(false)
    refetchQueriesOnPayoutSuccess()
    queryProject.execute()
    refetchBalance().catch(() => undefined)
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
