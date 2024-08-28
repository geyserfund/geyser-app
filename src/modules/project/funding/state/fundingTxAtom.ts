import { atom, useAtomValue, useSetAtom } from 'jotai'

import { FundingStatus, FundingTxFragment, FundingTxWithInvoiceStatusFragment, InvoiceStatus } from '../../../../types'

const initialFunding: Omit<FundingTxFragment, 'funder' | 'amountPaid'> = {
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
}

export enum ConfirmationMethod {
  Subscription = 'subscription',
  Polling = 'polling',
}

export const fundingTxAtom = atom(initialFunding)

const fundingTxPartialUpdateAtom = atom(null, (get, set, partial: Partial<FundingTxFragment>) => {
  const currentFundingTx = get(fundingTxAtom)
  set(fundingTxAtom, { ...currentFundingTx, ...partial })
})

const resetFundingTxAtom = atom(null, (get, set) => {
  set(fundingTxAtom, initialFunding)
})

const fundingStatusCheckAtom = atom(null, (get, set, fundingTx: FundingTxWithInvoiceStatusFragment) => {
  if (![FundingStatus.Paid, FundingStatus.Pending].includes(fundingTx.status)) {
    return
  }

  const currentFundingTx = get(fundingTxAtom)

  if (
    (fundingTx.invoiceStatus !== currentFundingTx.invoiceStatus || fundingTx.status !== currentFundingTx.status) &&
    fundingTx.invoiceId === currentFundingTx.invoiceId
  ) {
    set(fundingTxAtom, {
      ...currentFundingTx,
      ...fundingTx,
      paymentRequest: fundingTx.paymentRequest || currentFundingTx.paymentRequest,
      uuid: fundingTx.uuid || currentFundingTx.uuid,
    })
  }
})

export const useFundingTxAtom = () => {
  const fundingTx = useAtomValue(fundingTxAtom)
  const updateFundingTx = useSetAtom(fundingTxPartialUpdateAtom)
  const resetFundingTx = useSetAtom(resetFundingTxAtom)

  return {
    fundingTx,
    updateFundingTx,
    resetFundingTx,
  }
}

export const useCheckFundingStatusAtom = () => useSetAtom(fundingStatusCheckAtom)

/** Current Selected goal for Funding in context */
export const selectedGoalIdAtom = atom<string | null>(null)
