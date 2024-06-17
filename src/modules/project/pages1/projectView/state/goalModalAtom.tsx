import { atom } from 'jotai'

import { ProjectGoalFragment } from '../../../../../types'

export const currentGoalAtom = atom<ProjectGoalFragment | null>(null)

export const isGoalModalOpenAtom = atom(false)
export const isGoalDeleteModalOpenAtom = atom(false)
