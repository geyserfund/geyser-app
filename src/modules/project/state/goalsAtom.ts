import { atom } from 'jotai'

import { ProjectGoalsFragment } from '../../../types'

/** In Progress goals for Project in context */
export const inProgressGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** Completed goals for Project in context */
export const completedGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** If project has goals */
export const hasGoalsAtom = atom((get) => {
  const inProgressGoals = get(inProgressGoalsAtom)
  const completedGoals = get(completedGoalsAtom)

  return inProgressGoals.length > 0 || completedGoals.length > 0
})
