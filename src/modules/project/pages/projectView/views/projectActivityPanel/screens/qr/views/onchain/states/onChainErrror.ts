import { atom, useAtomValue, useSetAtom } from 'jotai'

export const onChainErrorAtom = atom<Error | string | undefined>(undefined)
export const useSetOnChainErrorAtom = () => useSetAtom(onChainErrorAtom)
export const useSetOnChainErrorValue = () => useAtomValue(onChainErrorAtom)
