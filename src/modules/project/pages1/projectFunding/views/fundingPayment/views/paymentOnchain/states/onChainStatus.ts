import { atom } from 'jotai'

/** This atom is used to track if the refund file has been downloaded */
export const onChainRefundDownloadedAtom = atom(false)

/** This atom is used to reset the on chain refund downloaded status */
export const resetOnChainRefundDownloadedAtom = atom(null, (_, set) => {
  set(onChainRefundDownloadedAtom, false)
})
