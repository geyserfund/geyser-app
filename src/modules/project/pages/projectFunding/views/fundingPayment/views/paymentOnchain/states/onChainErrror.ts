import { atom } from 'jotai'

import { SwapStatusUpdate } from '../hooks/useTransactionStatusUpdate'

export enum OnChainErrorStatuses {
  LOCKUP_FAILED = 'transaction.lockupFailed',
  INVOICE_FAILED = 'invoice.failedToPay',
  SWAP_EXPIRED = 'swap.expired',
}

export const onChainErrorAtom = atom<undefined | SwapStatusUpdate>(undefined)

export const resetOnChainErrorAtom = atom(null, (_, set) => {
  set(onChainErrorAtom, undefined)
})
