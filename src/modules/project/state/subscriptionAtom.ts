import { atom } from 'jotai'

import { ProjectSubscriptionPlansFragment } from '../../../types'

/** Subscriptions for the Project in context */
export const subscriptionsAtom = atom<ProjectSubscriptionPlansFragment[]>([])

/** Whether the Project has subscriptions */
export const hasSubscriptionsAtom = atom<boolean>((get) => {
  const subscriptions = get(subscriptionsAtom)
  return subscriptions.length > 0
})

/** Initial subscriptions load, set to false by default */
export const initialSubscriptionLoadAtom = atom(false)

/** Reset all real-atoms in this file to it's initial State */
export const subscriptionAtomReset = atom(null, (get, set) => {
  set(subscriptionsAtom, [])
  set(initialSubscriptionLoadAtom, false)
})
