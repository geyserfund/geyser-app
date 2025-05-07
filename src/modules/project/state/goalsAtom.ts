import { atom } from 'jotai'

import { convertSatsToCents } from '@/utils'

import { ProjectContributionFragment, ProjectGoalCurrency, ProjectGoalsFragment } from '../../../types'

/** In Progress goals for Project in context */
export const inProgressGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** Add contribution to in progress goals */
export const addContributionToInProgressGoalsAtom = atom(null, (get, set, payload: ProjectContributionFragment) => {
  const inProgressGoals = get(inProgressGoalsAtom)

  set(
    inProgressGoalsAtom,
    inProgressGoals.map((goal) => {
      if (goal.id === payload.projectGoalId) {
        const additionalAmount =
          goal.currency === ProjectGoalCurrency.Usdcent
            ? convertSatsToCents({ sats: payload.amount, bitcoinQuote: payload.bitcoinQuote })
            : payload.amount

        return {
          ...goal,
          amountContributed: goal.amountContributed ? goal.amountContributed + additionalAmount : additionalAmount,
        }
      }

      return goal
    }),
  )
})

/** Add or update in progress goals for Project in context */
export const addUpdateInProgressGoalsAtom = atom(null, (get, set, payload: ProjectGoalsFragment) => {
  const inProgressGoals = get(inProgressGoalsAtom)

  const isExist = inProgressGoals.find((goal) => goal.id === payload.id)

  if (isExist) {
    const updatedGoals = inProgressGoals.map((goal) => {
      if (goal.id === payload.id) {
        return payload
      }

      return goal
    })

    set(inProgressGoalsAtom, updatedGoals)
  } else {
    set(inProgressGoalsAtom, [...inProgressGoals, payload])
  }
})

/** Remove a goal from inprogress goals */
export const removeGoalsAtom = atom(null, (_, set, goalId: number) => {
  set(inProgressGoalsAtom, (current) => current.filter((goal) => goal.id !== goalId))
})

/** Completed goals for Project in context */
export const completedGoalsAtom = atom<ProjectGoalsFragment[]>([])

/** Initial goals  load, set to false by default */
export const initialGoalsLoadAtom = atom(false)

/** Goals loading, set to false by default */
export const goalsLoadingAtom = atom(true)

/** Reset all real-atoms in this file to it's initial State */
export const goalsAtomReset = atom(null, (get, set) => {
  set(inProgressGoalsAtom, [])
  set(completedGoalsAtom, [])
  set(initialGoalsLoadAtom, false)
  set(goalsLoadingAtom, true)
})
