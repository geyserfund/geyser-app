import { useAtom } from 'jotai'
import { useCallback } from 'react'

import { InvoiceStatus, useRefreshFundingInvoiceMutation } from '../../../../types'
import { useFundingTxAtom } from '../state/fundingTxAtom'
import { invoiceRefreshErrorAtom, invoiceRefreshLoadingAtom } from '../state/invoiceRefreshAtom'
import { useFundPollingAndSubscriptionAtom } from '../state/pollingFundingTx'

export const useRefreshInvoice = () => {
  const { fundingTx, updateFundingTx } = useFundingTxAtom()

  const [invoiceRefreshLoading, setRefreshingInvoice] = useAtom(invoiceRefreshLoadingAtom)
  const [invoiceRefreshErrored, setInvoiceRefreshErrored] = useAtom(invoiceRefreshErrorAtom)

  const { clearPollingAndSubscription } = useFundPollingAndSubscriptionAtom()

  const [refreshInvoice] = useRefreshFundingInvoiceMutation({
    variables: {
      fundingTxID: fundingTx.id,
    },
    onError(_) {
      setInvoiceRefreshErrored(true)

      clearPollingAndSubscription()
    },
  })

  const refreshFundingInvoice = useCallback(async () => {
    try {
      updateFundingTx({
        invoiceStatus: InvoiceStatus.Unpaid,
      })
      setRefreshingInvoice(true)
      const { data } = await refreshInvoice()

      if (data) {
        updateFundingTx({
          ...data.fundingInvoiceRefresh,
        })
        setRefreshingInvoice(false)
      }
    } catch (_) {
      //
    }
  }, [refreshInvoice, updateFundingTx, setRefreshingInvoice])

  return { refreshFundingInvoice, invoiceRefreshLoading, invoiceRefreshErrored }
}
