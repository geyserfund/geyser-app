import { atom } from 'jotai'

import { BoltzTransaction } from '../refund/api'

/** This atom is used to store the swap transaction data */
export const swapTransactionAtom = atom<BoltzTransaction>({} as BoltzTransaction)

/** This atom is used to reset the swap transaction data */
export const resetSwapTransactionAtom = atom(null, (_, set) => {
  set(swapTransactionAtom, {} as BoltzTransaction)
})
