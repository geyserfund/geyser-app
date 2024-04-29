import { atom, useAtomValue, useSetAtom } from 'jotai'

import { SwapStatusUpdate } from '../hooks/useTransactionStatusUpdate'

export const onChainErrorAtom = atom<undefined | SwapStatusUpdate>(undefined)
export const useSetOnChainErrorAtom = () => useSetAtom(onChainErrorAtom)
export const useSetOnChainErrorValue = () => useAtomValue(onChainErrorAtom)
