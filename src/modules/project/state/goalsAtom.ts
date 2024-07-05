import { atom } from 'jotai'

import { ProjectGoalsFragment } from '../../../types'

/** In Progress goals for Project in context */
export const inProgressGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** Completed goals for Project in context */
export const completedGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** Initial goals  load, set to false by default */
export const initialGoalsLoadAtom = atom(false)
