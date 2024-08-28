import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { DateTime } from 'luxon'

/* Date time in milliseconds, when the user last visited the My Projects page */
export const lastVistedMyProjectActivityAtom = atomWithStorage<number | null>('lastVistedMyProjectActivity', null)

/* JS Date object, when the user last visited the My Projects page  or last Week which ever is sooner */
export const lastVistedMyProjectActivityDateAtom = atom((get) => {
  const lastVistedMyProjectActivity = get(lastVistedMyProjectActivityAtom)

  const aWeekAgo = DateTime.now().minus({ days: 7 })

  if (lastVistedMyProjectActivity === null || lastVistedMyProjectActivity < aWeekAgo.toMillis()) {
    return aWeekAgo.toJSDate()
  }

  return DateTime.fromMillis(lastVistedMyProjectActivity).toJSDate()
})

/* Date time in milliseconds, when the user last visited the Activity page */
export const lastVisitedFollowedActivityAtom = atomWithStorage('lastVisitedFollowedActivity', null)

/* JS Date object, when the user last visited the Activity page  or last Week which ever is sooner */
export const lastVisitedFollowedActivityDateAtom = atom((get) => {
  const lastVisitedFollowedActivity = get(lastVisitedFollowedActivityAtom)

  const aWeekAgo = DateTime.now().minus({ days: 7 })

  if (lastVisitedFollowedActivity === null || lastVisitedFollowedActivity < aWeekAgo.toMillis()) {
    return aWeekAgo.toJSDate()
  }

  return DateTime.fromMillis(lastVisitedFollowedActivity).toJSDate()
})
