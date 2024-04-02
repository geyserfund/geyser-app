import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

import {
  fundingFlowErrorAtom,
  fundingRequestErrorAtom,
  invoiceRefreshErrorAtom,
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

  const resetFundingFlow = useCallback(() => {
    resetFundingStage()
    setFundingRequestErrored(false)
    setInvoiceRefreshErrored(false)
    setError('')
    setWebLNErrored(false)
    resetFundingTx()
  }, [resetFundingStage, setFundingRequestErrored, setInvoiceRefreshErrored, setError, setWebLNErrored, resetFundingTx])

  return resetFundingFlow
}
