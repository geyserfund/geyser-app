import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { DateTime } from 'luxon'

/** Date time in milliseconds, when the user last visited the My Projects page */
export const lastVistedMyProjectActivityAtom = atomWithStorage<number | null>('lastVistedMyProjectActivity', null)

/** JS Date object, when the user last visited the My Projects page  or last Week which ever is sooner */
export const lastVistedMyProjectActivityDateAtom = atom((get) => {
  const lastVistedMyProjectActivity = get(lastVistedMyProjectActivityAtom)

  const aWeekAgo = DateTime.now().minus({ days: 7 })

  if (lastVistedMyProjectActivity === null || lastVistedMyProjectActivity < aWeekAgo.toMillis()) {
    return aWeekAgo.toMillis()
  }

  return lastVistedMyProjectActivity
})

/** Set the last visited date to now */
export const setLastVisitedMyProjectActivityAtom = atom(null, (get, set) => {
  const date = DateTime.now().toMillis()
  set(lastVistedMyProjectActivityAtom, date)
})
