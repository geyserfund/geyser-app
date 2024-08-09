import { atom, useAtomValue, useSetAtom } from 'jotai'

import { SwapStatusUpdate } from '../hooks/useTransactionStatusUpdate'

export enum OnChainErrorStatuses {
  LOCKUP_FAILED = 'transaction.lockupFailed',
  INVOICE_FAILED = 'invoice.failedToPay',
  SWAP_EXPIRED = 'swap.expired',
}

export const onChainErrorAtom = atom<undefined | SwapStatusUpdate>(undefined)
export const useSetOnChainErrorAtom = () => useSetAtom(onChainErrorAtom)
export const useSetOnChainErrorValue = () => useAtomValue(onChainErrorAtom)
