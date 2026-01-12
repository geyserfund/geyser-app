import { atomWithStorage } from 'jotai/utils'

/** Stores the user's account password in localStorage for convenience */
export const accountPasswordAtom = atomWithStorage<string | null>('accountPassword', null)
