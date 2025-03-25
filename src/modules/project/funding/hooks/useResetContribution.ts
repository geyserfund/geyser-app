import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { resetFiatSwapStatusAtom } from '../../pages1/projectFunding/views/fundingPayment/views/paymentFiatSwap/atom/fiatSwapStatusAtom.ts'
import { resetOnChainErrorAtom } from '../../pages1/projectFunding/views/fundingPayment/views/paymentOnchain/states/onChainErrror.ts'
import { resetOnChainRefundDownloadedAtom } from '../../pages1/projectFunding/views/fundingPayment/views/paymentOnchain/states/onChainStatus.ts'
import { resetSwapTransactionAtom } from '../../pages1/projectFunding/views/fundingPayment/views/paymentOnchain/states/onChainTransaction.ts'
import { resetFundingErrorAtom } from '../state/errorAtom.ts'
import { resetFundingContributionAtom } from '../state/fundingContributionAtom.ts'
import { resetFundingInputAfterRequestAtom } from '../state/fundingContributionCreateInputAtom.ts'
import { resetFundingPaymentDetailsAtom } from '../state/fundingPaymentAtom.ts'
import { stopPollingAndSubscriptionAtom } from '../state/pollingAndSubscriptionAtom.ts'

/** Reset contribution state, without changing anything about the funding form */
export const useResetContribution = () => {
  const resetFundingContribution = useSetAtom(resetFundingContributionAtom)
  const resetFundingPaymentDetails = useSetAtom(resetFundingPaymentDetailsAtom)
  const resetFundingInputAfterRequest = useSetAtom(resetFundingInputAfterRequestAtom)
  const resetFundingError = useSetAtom(resetFundingErrorAtom)

  const resetOnChainRefundDownloaded = useSetAtom(resetOnChainRefundDownloadedAtom)
  const resetOnChainError = useSetAtom(resetOnChainErrorAtom)
  const resetSwapTransaction = useSetAtom(resetSwapTransactionAtom)

  const resetFiatSwapStatus = useSetAtom(resetFiatSwapStatusAtom)

  const stopPollingAndSubscription = useSetAtom(stopPollingAndSubscriptionAtom)

  const resetContribution = useCallback(() => {
    resetFundingContribution()
    resetSwapTransaction()
    resetOnChainRefundDownloaded()
    resetOnChainError()
    resetFiatSwapStatus()
    resetFundingPaymentDetails()
    resetFundingInputAfterRequest()
    resetFundingError()
    stopPollingAndSubscription()
  }, [
    resetFundingContribution,
    resetSwapTransaction,
    resetOnChainRefundDownloaded,
    resetOnChainError,
    resetFiatSwapStatus,
    resetFundingPaymentDetails,
    resetFundingInputAfterRequest,
    resetFundingError,
    stopPollingAndSubscription,
  ])

  return resetContribution
}
