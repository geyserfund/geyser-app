import { atom } from 'jotai'

import { ProjectGoalFragment } from '../../../../../types'

/** Current Goal in goal edit view */
export const currentGoalAtom = atom<ProjectGoalFragment | null>(null)

/** If the goal Modal is open */
export const isGoalModalOpenAtom = atom(false)

/** If the goal modal is open */
export const isGoalDeleteModalOpenAtom = atom(false)

/** If the goal order is in edit mode */
export const isGoalinEditModeAtom = atom(false)
