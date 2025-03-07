import { atom } from 'jotai'

/** Current Selected goal for Funding in context */
export const selectedGoalIdAtom = atom<string | null>(null)
