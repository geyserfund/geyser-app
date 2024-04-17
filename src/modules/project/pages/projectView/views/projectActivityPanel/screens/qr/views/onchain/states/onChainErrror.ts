import { atom, useSetAtom } from 'jotai'

export const onChainErrorAtom = atom<Error | string | undefined>(undefined)
export const useSetOnChainErrorAtom = () => useSetAtom(onChainErrorAtom)
