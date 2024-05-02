import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { RejectionError } from 'webln'

import { FundingTxFragment } from '../../../../types'
import { useNotification } from '../../../../utils'
import { weblnErrorAtom } from '../state/errorAtom'
import { setNextFundingStageAtom } from '../state/fundingStagesAtom'
import { requestWebLNPayment, WEBLN_ENABLE_ERROR } from '../utils/requestWebLNPayment'

export const useWebLNFlow = () => {
  const { toast } = useNotification()
  const setNextFundingStage = useSetAtom(setNextFundingStageAtom)
  const [weblnErrored, setWebLNErrored] = useAtom(weblnErrorAtom)

  const startWebLNFlow = useCallback(
    async (fundingTx: FundingTxFragment) => {
      if (weblnErrored) {
        return
      }

      try {
        const paymentHash = await requestWebLNPayment(fundingTx)

        // Check preimage
        if (paymentHash === fundingTx.invoiceId) {
          setNextFundingStage()
          return true
        }

        setWebLNErrored(true)

        throw new Error('wrong preimage')
      } catch (error: any) {
        setWebLNErrored(true)

        if (error.message === 'no provider') {
          throw error
        }

        if (error.message === 'wrong preimage') {
          toast({
            title: 'Wrong payment preimage',
            description: 'The payment preimage returned by the WebLN provider did not match the payment hash.',
            status: 'error',
          })
          return false
        }

        if (error.constructor === RejectionError || error.message === 'User rejected') {
          toast({
            title: 'Requested operation declined',
            description: 'Please use the invoice instead.',
            status: 'info',
          })
          return false
        }

        if (error.message === WEBLN_ENABLE_ERROR) {
          return false
        }

        toast({
          title: 'Oops! Something went wrong with WebLN.',
          description: 'Please copy the invoice manually instead.',
          status: 'error',
        })

        return false
      }
    },
    [setNextFundingStage, toast, weblnErrored, setWebLNErrored],
  )
  return startWebLNFlow
}
