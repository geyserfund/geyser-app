import { atom } from 'jotai'

import { BoltzTransaction } from '../refund/api'

/** This atom is used to store the swap transaction data */
export const swapTransactionAtom = atom<BoltzTransaction>({} as BoltzTransaction)
