import { atom } from 'jotai'

import { ProjectGoalsFragment } from '../../../types'

/** In Progress goals for Project in context */
export const inProgressGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** If in progress goals are loading */
export const inProgressGoalsLoadingAtom = atom(true)

/** Completed goals for Project in context */
export const completedGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** If completed goals are loading */
export const completedGoalsLoadingAtom = atom(true)

/** If project has goals */
export const hasGoalsAtom = atom((get) => {
  const inProgressGoals = get(inProgressGoalsAtom)
  const completedGoals = get(completedGoalsAtom)

  return inProgressGoals.length > 0 || completedGoals.length > 0
})
