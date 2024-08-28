import { atom, useAtomValue, useSetAtom } from 'jotai'

import { BoltzTransaction } from '../refund/api'

export const swapTransactionAtom = atom<BoltzTransaction>({} as BoltzTransaction)
export const useSetSwapTransaction = () => useSetAtom(swapTransactionAtom)
export const useSwapTransactionValue = () => useAtomValue(swapTransactionAtom)
