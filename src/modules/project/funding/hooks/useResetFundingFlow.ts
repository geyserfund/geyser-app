import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

import {
  currentSwapIdAtom,
  fundingFlowErrorAtom,
  fundingRequestErrorAtom,
  invoiceRefreshErrorAtom,
  useClearRefundedSwapData,
  useFundingStage,
  useFundingTxAtom,
  weblnErrorAtom,
} from '../state'
import { useFundPollingAndSubscriptionAtom } from '../state/pollingFundingTx'

export const useResetFundingFlow = () => {
  const { resetFundingStage } = useFundingStage()
  const { resetFundingTx } = useFundingTxAtom()

  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)
  const setInvoiceRefreshErrored = useSetAtom(invoiceRefreshErrorAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setWebLNErrored = useSetAtom(weblnErrorAtom)

  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)
  const setRefundedSwapData = useClearRefundedSwapData()

  const { clearPollingAndSubscription } = useFundPollingAndSubscriptionAtom()

  const resetFundingFlow = useCallback(() => {
    resetFundingStage()
    setFundingRequestErrored(false)
    setInvoiceRefreshErrored(false)
    setError(undefined)
    setWebLNErrored(false)
    resetFundingTx()

    setCurrentSwapId('')

    setRefundedSwapData()
    clearPollingAndSubscription()
  }, [
    resetFundingStage,
    setFundingRequestErrored,
    setInvoiceRefreshErrored,
    setError,
    setWebLNErrored,
    resetFundingTx,
    setCurrentSwapId,
    setRefundedSwapData,
    clearPollingAndSubscription,
  ])

  return resetFundingFlow
}
