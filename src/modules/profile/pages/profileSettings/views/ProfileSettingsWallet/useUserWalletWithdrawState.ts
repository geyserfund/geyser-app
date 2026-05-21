import { t } from 'i18next'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import { MIN_BITCOIN_PAYOUT_USD } from '@/modules/project/constants/payout.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'
import {
  PaymentStatus,
  useUserWalletWithdrawActiveQuery,
  useUserWalletWithdrawLatestQuery,
  UserWalletWithdrawStatus,
} from '@/types/index.ts'

/** One PRISM unit is represented as 10,000,000,000 sats on Rootstock. */
const SATS_PER_PRISM_UNIT = 10000000000n
const ACTIVE_STATUSES = [UserWalletWithdrawStatus.Pending, UserWalletWithdrawStatus.Processing]

type UseUserWalletWithdrawStateParams = {
  rskAddress: string
  hasWalletConfigured: boolean
}

export const useUserWalletWithdrawState = ({ rskAddress, hasWalletConfigured }: UseUserWalletWithdrawStateParams) => {
  const { getUSDCentsAmount } = useBTCConverter()

  const {
    withdrawable,
    isLoading: isWithdrawableLoading,
    refetch: refetchWithdrawable,
  } = usePrismWithdrawable({ rskAddress })

  const {
    data: activeData,
    loading: isActiveLoading,
    refetch: refetchActive,
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

  const withdrawableSats = withdrawable ? withdrawable / SATS_PER_PRISM_UNIT : 0n
  const withdrawableUsdCents = getUSDCentsAmount(withdrawableSats)
  const withdrawableUsd = withdrawableUsdCents / 100
  const minPayoutCents = MIN_BITCOIN_PAYOUT_USD * 100
  const isBelowMinimumWithdrawal = withdrawableUsdCents > 0 && withdrawableUsdCents < minPayoutCents

  const activeWithdraw = activeData?.userWalletWithdrawActive?.userWalletWithdraw
  const latestWithdraw = latestData?.userWalletWithdrawLatest?.userWalletWithdraw
  const latestWithdrawPayment = [...(latestWithdraw?.payments ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0]

  const hasRetryableWithdraw =
    latestWithdraw?.status === UserWalletWithdrawStatus.Failed &&
    latestWithdrawPayment?.status === PaymentStatus.Refunded
  const hasActiveWithdraw = Boolean(activeWithdraw && ACTIVE_STATUSES.includes(activeWithdraw.status))
  const canWithdraw =
    !hasActiveWithdraw && (withdrawableUsdCents >= minPayoutCents || hasRetryableWithdraw)
  const isWithdrawStateLoading = isActiveLoading || isLatestLoading
  const withdrawButtonLabel = hasRetryableWithdraw ? t('Retry') : t('Withdraw')

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
