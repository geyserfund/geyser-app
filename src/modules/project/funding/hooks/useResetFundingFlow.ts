import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

import { onChainRefundDownloadedAtom } from '../../pages1/projectFunding/views/fundingPayment/views/paymentOnchain/states'
import {
  currentSwapIdAtom,
  fundingFlowErrorAtom,
  fundingRequestErrorAtom,
  invoiceRefreshErrorAtom,
  selectedGoalIdAtom,
  useClearRefundedSwapData,
  useFundingTxAtom,
  weblnErrorAtom,
} from '../state'
import { useFundPollingAndSubscriptionAtom } from '../state/pollingFundingTx'

export const useResetFundingFlow = () => {
  const { resetFundingTx } = useFundingTxAtom()

  const setProjectGoalId = useSetAtom(selectedGoalIdAtom)

  const setOnChainDownloaded = useSetAtom(onChainRefundDownloadedAtom)

  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)
  const setInvoiceRefreshErrored = useSetAtom(invoiceRefreshErrorAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setWebLNErrored = useSetAtom(weblnErrorAtom)

  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)
  const clearRefundedSwapData = useClearRefundedSwapData()

  const { clearPollingAndSubscription } = useFundPollingAndSubscriptionAtom()

  const resetFundingFlow = useCallback(() => {
    setFundingRequestErrored(false)
    setInvoiceRefreshErrored(false)
    setError(undefined)
    setWebLNErrored(false)

    setOnChainDownloaded(false)

    resetFundingTx()

    setCurrentSwapId('')

    clearRefundedSwapData()
    clearPollingAndSubscription()

    setProjectGoalId(null)
  }, [
    setFundingRequestErrored,
    setInvoiceRefreshErrored,
    setError,
    setWebLNErrored,
    setOnChainDownloaded,
    resetFundingTx,
    setCurrentSwapId,
    clearRefundedSwapData,
    clearPollingAndSubscription,
    setProjectGoalId,
  ])

  return resetFundingFlow
}
