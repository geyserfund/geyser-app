import { atom, useAtomValue, useSetAtom } from 'jotai'
import { atomEffect } from 'jotai-effect'
import { useCallback } from 'react'

import { FundingStatus, FundingTxFragment, FundingTxWithInvoiceStatusFragment, InvoiceStatus } from '../../../types'
import { authUserAtom } from '../../auth/state'
import { findNextFundingStage } from '../utils/helpers'
import { fundingStageAtom } from './fundingStagesAtom'
import { pollingFundingTxAtom, subscriptionActiveAtom } from './pollingFundingTx'

const initialFunding: FundingTxFragment = {
  id: 0,
  uuid: '',
  invoiceId: '',
  status: FundingStatus.Unpaid,
  invoiceStatus: InvoiceStatus.Unpaid,
  amount: 0,
  projectId: '',
  paymentRequest: '',
  address: '',
  comment: '',
  media: '',
  paidAt: '',
  onChain: false,
  source: '',
  funder: {
    id: 0,
    user: {
      id: 0,
      username: '',
    },
  },
}

export enum ConfirmationMethod {
  Subscription = 'subscription',
  Polling = 'polling',
}

const fundingTxAtom = atom(initialFunding)

// If user logs in in the middle of the funding flow, update the funder
export const fundingTxEffect = atomEffect((get, set) => {
  const value = get.peek(fundingTxAtom)
  const user = get(authUserAtom)
  if (user.id) {
    set(fundingTxAtom, { ...value, funder: { ...value.funder, user } })
  }
})

const fundingTxPartialUpdateAtom = atom(null, (get, set, partial: Partial<FundingTxFragment>) => {
  const currentFundingTx = get(fundingTxAtom)
  set(fundingTxAtom, { ...currentFundingTx, ...partial })
})

const resetFundingTxAtom = atom(null, (get, set) => {
  const user = get(authUserAtom)
  set(fundingTxAtom, { ...initialFunding, funder: { ...initialFunding.funder, user } })
})

const fundingStatusCheckAtom = atom(
  null,
  (get, set, { fundingTx, method }: { fundingTx: FundingTxWithInvoiceStatusFragment; method: ConfirmationMethod }) => {
    if (![FundingStatus.Paid, FundingStatus.Pending].includes(fundingTx.status)) {
      return
    }

    const currentFundingTx = get(fundingTxAtom)

    if (
      (fundingTx.invoiceStatus !== currentFundingTx.invoiceStatus || fundingTx.status !== currentFundingTx.status) &&
      fundingTx.invoiceId === currentFundingTx.invoiceId
    ) {
      if (
        fundingTx.status === FundingStatus.Paid ||
        (fundingTx.onChain && fundingTx.status === FundingStatus.Pending)
      ) {
        const currentState = get(fundingStageAtom)
        const nextState = findNextFundingStage(currentState)
        set(fundingStageAtom, nextState)

        // Resetting the polling and subscription after status check shows transaction completed.
        set(pollingFundingTxAtom, 0)
        set(subscriptionActiveAtom, false)
      }

      set(fundingTxAtom, {
        ...currentFundingTx,
        ...fundingTx,
        paymentRequest: fundingTx.paymentRequest || currentFundingTx.paymentRequest,
        uuid: fundingTx.uuid || currentFundingTx.uuid,
      })
    }
  },
)

export const useFundingTx = () => {
  const fundingTx = useAtomValue(fundingTxAtom)
  const updateFundingTx = useSetAtom(fundingTxPartialUpdateAtom)
  const resetFundingTx = useSetAtom(resetFundingTxAtom)

  return {
    fundingTx,
    updateFundingTx,
    resetFundingTx,
  }
}

export const useCheckFundingStatus = () => {
  const _checkFundingStatus = useSetAtom(fundingStatusCheckAtom)

  const checkFundingStatus = useCallback(
    (fundingTx: FundingTxWithInvoiceStatusFragment, method: ConfirmationMethod) => {
      _checkFundingStatus({ fundingTx, method })
    },
    [_checkFundingStatus],
  )

  return checkFundingStatus
}
