import { t } from 'i18next'
import { useAtom } from 'jotai'
import { useCallback } from 'react'
import { RejectionError } from 'webln'

import { ContributionLightningPaymentDetailsFragment } from '@/types/index.ts'
import { useNotification } from '@/utils/index.ts'

import { weblnErrorAtom } from '../state/errorAtom'
import { requestWebLNPayment, WEBLN_ENABLE_ERROR } from '../utils/requestWebLNPayment'

export const useWebLNFlow = () => {
  const { toast } = useNotification()

  const [weblnErrored, setWebLNErrored] = useAtom(weblnErrorAtom)

  const startWebLNFlow = useCallback(
    async (paymentLightning: ContributionLightningPaymentDetailsFragment) => {
      if (weblnErrored) {
        return
      }

      try {
        const paymentHash = await requestWebLNPayment(paymentLightning)

        // Check preimage
        if (paymentHash === paymentLightning.lightningInvoiceId) {
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
            title: t('Requested operation declined'),
            description: t('Please use the invoice instead.'),
            status: 'info',
          })
          return false
        }

        if (error.message === WEBLN_ENABLE_ERROR) {
          return false
        }

        toast({
          title: t('Oops! Something went wrong with WebLN.'),
          description: t('Please copy the invoice manually instead.'),
          status: 'error',
        })

        return false
      }
    },
    [toast, weblnErrored, setWebLNErrored],
  )
  return startWebLNFlow
}
