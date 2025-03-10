import { atom } from 'jotai'

export enum FiatSwapStatus {
  initial = 'initial',
  pending = 'pending',
  success = 'success',
  failed = 'failed',
}

export const fiatSwapStatusAtom = atom<FiatSwapStatus>(FiatSwapStatus.pending)

export const resetFiatSwapStatusAtom = atom(null, (get, set) => {
  set(fiatSwapStatusAtom, FiatSwapStatus.initial)
})
