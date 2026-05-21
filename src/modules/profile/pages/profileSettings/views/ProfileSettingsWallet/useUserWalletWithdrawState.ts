import { useQuery } from '@apollo/client'
import { t } from 'i18next'

import { useBTCConverter } from '@/helpers/useBTCConverter.ts'
import {
  QUERY_USER_WALLET_WITHDRAW_ACTIVE,
  QUERY_USER_WALLET_WITHDRAW_LATEST,
} from '@/modules/profile/graphql/userWalletWithdraw.ts'
import { MIN_BITCOIN_PAYOUT_USD } from '@/modules/project/constants/payout.ts'
import { usePrismWithdrawable } from '@/modules/project/pages/projectView/views/body/sections/tiaNotification/usePrismWithdrawable.ts'

const SATS_PER_PRISM_UNIT = 10000000000n
const ACTIVE_STATUSES = ['PENDING', 'PROCESSING']

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
  } = useQuery(QUERY_USER_WALLET_WITHDRAW_ACTIVE, {
    fetchPolicy: 'cache-and-network',
    skip: !hasWalletConfigured,
  })

  const {
    data: latestData,
    loading: isLatestLoading,
    refetch: refetchLatest,
  } = useQuery(QUERY_USER_WALLET_WITHDRAW_LATEST, {
    fetchPolicy: 'cache-and-network',
    skip: !hasWalletConfigured,
  })

  const withdrawableSats = withdrawable ? withdrawable / SATS_PER_PRISM_UNIT : 0n
  const withdrawableUsd = getUSDCentsAmount(withdrawableSats) / 100
  const isBelowMinimumWithdrawal = withdrawableUsd > 0 && withdrawableUsd < MIN_BITCOIN_PAYOUT_USD

  const activeWithdraw = activeData?.userWalletWithdrawActive?.userWalletWithdraw
  const latestWithdraw = latestData?.userWalletWithdrawLatest?.userWalletWithdraw
  const latestWithdrawPayment = [...(latestWithdraw?.payments ?? [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )[0]

  const hasRetryableWithdraw =
    latestWithdraw?.status === 'FAILED' && latestWithdrawPayment?.status === 'REFUNDED'
  const hasActiveWithdraw = Boolean(activeWithdraw && ACTIVE_STATUSES.includes(activeWithdraw.status))
  const canWithdraw =
    !hasActiveWithdraw && (withdrawableUsd >= MIN_BITCOIN_PAYOUT_USD || hasRetryableWithdraw)
  const isWithdrawStateLoading = isActiveLoading || isLatestLoading
  const withdrawButtonLabel = hasRetryableWithdraw ? t('Retry') : t('Withdraw')

  const refetchAll = () => {
    refetchWithdrawable()
    refetchActive()
    refetchLatest()
  }

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
