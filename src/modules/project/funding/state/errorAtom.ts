import { atom } from 'jotai'

export const fundingFlowErrorAtom = atom('')

export const weblnErrorAtom = atom(false)

export const fundingRequestErrorAtom = atom(false)

export const swapError = atom<Error | null>(null)
