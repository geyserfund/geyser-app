import { useEffect, useRef } from 'react'
import { t } from 'i18next'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { MIN_BITCOIN_PAYOUT_SATS } from '@/modules/project/constants/payout.ts'
import { useRootstockBalance } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/useRootstockBalance.ts'
import {
  PaymentStatus,
  UserWalletWithdrawStatus,
  useUserWalletWithdrawActiveQuery,
  useUserWalletWithdrawLatestQuery,
} from '@/types/index.ts'

/** One satoshi is represented as 10,000,000,000 wei on Rootstock. */
const WEI_PER_SAT = 10000000000n
const MIN_BITCOIN_PAYOUT_SATS_BIGINT = BigInt(MIN_BITCOIN_PAYOUT_SATS)
const ACTIVE_STATUSES = [UserWalletWithdrawStatus.Pending, UserWalletWithdrawStatus.Processing]
const WITHDRAW_POLL_INTERVAL_MS = 10_000

type UseUserWalletWithdrawStateParams = {
  rskAddress: string
  hasWalletConfigured: boolean
}

export const useUserWalletWithdrawState = ({ rskAddress, hasWalletConfigured }: UseUserWalletWithdrawStateParams) => {
  const { getUSDCentsAmount } = useBTCConverter()
  const previousActiveStatusRef = useRef<UserWalletWithdrawStatus | null | undefined>(undefined)

  const {
    balance,
    isLoading: isWithdrawableLoading,
    refetch: refetchWithdrawable,
  } = useRootstockBalance({ rskAddress })

  const {
    data: activeData,
    loading: isActiveLoading,
    refetch: refetchActive,
    startPolling: startActivePolling,
    stopPolling: stopActivePolling,
  } = useUserWalletWithdrawActiveQuery({
    fetchPolicy: 'cache-and-network',
    skip: !hasWalletConfigured,
  })

  const {
    data: latestData,
    loading: isLatestLoading,
    refetch: refetchLatest,
  } = useUserWalletWithdrawLatestQuery({
    fetchPolicy: 'cache-and-network',
    skip: !hasWalletConfigured,
  })

  const withdrawableSats = balance ? balance / WEI_PER_SAT : 0n
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats)
  const withdrawableUsd = withdrawableUsdCents / 100
  const isBelowMinimumWithdrawal = withdrawableSats > 0n && withdrawableSats < MIN_BITCOIN_PAYOUT_SATS_BIGINT

  const activeWithdraw = activeData?.userWalletWithdrawActive?.userWalletWithdraw
  const latestWithdraw = latestData?.userWalletWithdrawLatest?.userWalletWithdraw
  const latestWithdrawPayment = [...(latestWithdraw?.payments ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0]

  const hasRetryableWithdraw =
    latestWithdraw?.status === UserWalletWithdrawStatus.Failed &&
    latestWithdrawPayment?.status === PaymentStatus.Refunded
  const hasActiveWithdraw = Boolean(activeWithdraw && ACTIVE_STATUSES.includes(activeWithdraw.status))
  const canWithdraw = !hasActiveWithdraw && (withdrawableSats >= MIN_BITCOIN_PAYOUT_SATS_BIGINT || hasRetryableWithdraw)
  const isWithdrawStateLoading = isActiveLoading || isLatestLoading
  const withdrawButtonLabel = hasRetryableWithdraw ? t('Retry') : t('Withdraw')

  useEffect(() => {
    if (!hasWalletConfigured) {
      stopActivePolling()
      return
    }

    if (hasActiveWithdraw) {
      startActivePolling(WITHDRAW_POLL_INTERVAL_MS)
    } else {
      stopActivePolling()
    }

    return () => {
      stopActivePolling()
    }
  }, [hasActiveWithdraw, hasWalletConfigured, startActivePolling, stopActivePolling])

  useEffect(() => {
    if (!hasWalletConfigured) {
      previousActiveStatusRef.current = activeWithdraw?.status
      return
    }

    const previousStatus = previousActiveStatusRef.current
    const nextStatus = activeWithdraw?.status
    previousActiveStatusRef.current = nextStatus

    const leftActive =
      previousStatus &&
      ACTIVE_STATUSES.includes(previousStatus) &&
      (!nextStatus || !ACTIVE_STATUSES.includes(nextStatus))

    if (leftActive) {
      refetchWithdrawable().catch(() => undefined)
      refetchLatest().catch(() => undefined)
    }
  }, [activeWithdraw?.status, hasWalletConfigured, refetchLatest, refetchWithdrawable])

  const refetchAll = () => Promise.all([refetchWithdrawable(), refetchActive(), refetchLatest()])

  return {
    withdrawableSats,
    withdrawableUsd,
    isWithdrawableLoading,
    isWithdrawStateLoading,
    isBelowMinimumWithdrawal,
    hasActiveWithdraw,
    canWithdraw,
    withdrawButtonLabel,
    refetchAll,
  }
}
