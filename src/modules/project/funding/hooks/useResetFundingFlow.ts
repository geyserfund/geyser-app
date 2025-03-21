import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { resetFiatSwapStatusAtom } from '../../pages1/projectFunding/views/fundingPayment/views/paymentFiatSwap/fiatSwapStatus.ts'
import { onChainRefundDownloadedAtom } from '../../pages1/projectFunding/views/fundingPayment/views/paymentOnchain/states/onChainStatus.ts'
import {
  currentSwapIdAtom,
  fundingFlowErrorAtom,
  fundingRequestErrorAtom,
  invoiceRefreshErrorAtom,
  selectedGoalIdAtom,
  useClearRefundedSwapData,
  weblnErrorAtom,
} from '../state'
import { resetFundingContributionAtom } from '../state/fundingContributionAtom.ts'
import { resetFundingPaymentDetailsAtom } from '../state/fundingPaymentAtom.ts'
import { stopPollingAndSubscriptionAtom } from '../state/pollingAndSubscriptionAtom'

export const useResetFundingFlow = () => {
  const resetFundingContribution = useSetAtom(resetFundingContributionAtom)
  const resetFundingPaymentDetails = useSetAtom(resetFundingPaymentDetailsAtom)

  const setProjectGoalId = useSetAtom(selectedGoalIdAtom)

  const setOnChainDownloaded = useSetAtom(onChainRefundDownloadedAtom)

  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)
  const setInvoiceRefreshErrored = useSetAtom(invoiceRefreshErrorAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setWebLNErrored = useSetAtom(weblnErrorAtom)

  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)
  const clearRefundedSwapData = useClearRefundedSwapData()

  const stopPollingAndSubscription = useSetAtom(stopPollingAndSubscriptionAtom)

  const resetFiatSwapStatus = useSetAtom(resetFiatSwapStatusAtom)

  const resetFundingFlow = useCallback(() => {
    setFundingRequestErrored(false)
    setInvoiceRefreshErrored(false)
    setError(undefined)
    setWebLNErrored(false)

    setOnChainDownloaded(false)

    resetFundingContribution()
    resetFundingPaymentDetails()

    setCurrentSwapId('')

    clearRefundedSwapData()
    stopPollingAndSubscription()

    setProjectGoalId(null)
    resetFiatSwapStatus()
  }, [
    setFundingRequestErrored,
    setInvoiceRefreshErrored,
    setError,
    setWebLNErrored,
    setOnChainDownloaded,
    resetFundingContribution,
    resetFundingPaymentDetails,
    setCurrentSwapId,
    clearRefundedSwapData,
    stopPollingAndSubscription,
    setProjectGoalId,
    resetFiatSwapStatus,
  ])

  return resetFundingFlow
}
