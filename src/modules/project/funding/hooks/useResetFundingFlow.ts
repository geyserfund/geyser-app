import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

import {
  currentSwapIdAtom,
  fundingFlowErrorAtom,
  fundingRequestErrorAtom,
  invoiceRefreshErrorAtom,
  useClearRefundedSwapData,
  useFundingStage,
  useFundingTx,
  weblnErrorAtom,
} from '../state'

export const useResetFundingFlow = () => {
  const { resetFundingStage } = useFundingStage()
  const { resetFundingTx } = useFundingTx()

  const setFundingRequestErrored = useSetAtom(fundingRequestErrorAtom)
  const setInvoiceRefreshErrored = useSetAtom(invoiceRefreshErrorAtom)

  const setError = useSetAtom(fundingFlowErrorAtom)
  const setWebLNErrored = useSetAtom(weblnErrorAtom)

  const setCurrentSwapId = useSetAtom(currentSwapIdAtom)
  const setRefundedSwapData = useClearRefundedSwapData()

  const resetFundingFlow = useCallback(() => {
    resetFundingStage()
    setFundingRequestErrored(false)
    setInvoiceRefreshErrored(false)
    setError(undefined)
    setWebLNErrored(false)
    resetFundingTx()

    setCurrentSwapId('')

    setRefundedSwapData()
  }, [
    resetFundingStage,
    setFundingRequestErrored,
    setInvoiceRefreshErrored,
    setError,
    setWebLNErrored,
    resetFundingTx,
    setCurrentSwapId,

    setRefundedSwapData,
  ])

  return resetFundingFlow
}
