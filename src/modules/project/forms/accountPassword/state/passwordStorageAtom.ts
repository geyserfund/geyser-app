import { atom } from 'jotai'

/** Stores the user's account password in localStorage for convenience */
export const accountPasswordAtom = atom<string | null>(null)
