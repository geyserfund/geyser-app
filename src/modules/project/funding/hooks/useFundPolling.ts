import { useAtomValue } from 'jotai'

import { useFundingTxWithInvoiceStatusQuery } from '@/types'
import { toInt } from '@/utils'

import { ConfirmationMethod, useCheckFundingStatusAtom, useFundingTxAtom } from '../state'
import { pollingFundingTxAtom } from '../state/pollingFundingTx'

export const useFundPolling = () => {
  const checkFundingStatus = useCheckFundingStatusAtom()

  const pollingFundingTx = useAtomValue(pollingFundingTxAtom)

  const { fundingTx } = useFundingTxAtom()

  const skipPolling = pollingFundingTx === 0 || !fundingTx.id

  const { refetch } = useFundingTxWithInvoiceStatusQuery({
    variables: {
      fundingTxID: toInt(fundingTx.id),
    },
    notifyOnNetworkStatusChange: true,
    skip: skipPolling,
    onCompleted(data) {
      if (data && data.fundingTx) {
        checkFundingStatus(data.fundingTx, ConfirmationMethod.Polling)
      }
    },
    pollInterval: pollingFundingTx,
    fetchPolicy: 'network-only',
  })

  return {
    refetch,
  }
}
