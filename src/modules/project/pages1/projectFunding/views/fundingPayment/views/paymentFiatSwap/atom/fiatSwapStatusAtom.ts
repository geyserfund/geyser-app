import { atom } from 'jotai'

export enum FiatSwapStatus {
  initial = 'initial',
  pending = 'pending',
  processing = 'processing',
  success = 'success',
  failed = 'failed',
}

export const fiatSwapStatusAtom = atom<FiatSwapStatus>(FiatSwapStatus.initial)

export const fiatFailureReasonAtom = atom<string | null>(null)

export const resetFiatSwapStatusAtom = atom(null, (get, set) => {
  set(fiatSwapStatusAtom, FiatSwapStatus.initial)
  set(fiatFailureReasonAtom, null)
})
