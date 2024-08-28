import { atom } from 'jotai'

/** Holds all the history of the routes since user visited */
export const historyRouteAtom = atom<string[]>([])

/** Set the next route when user visits one */
export const historyRouteSetAtom = atom(null, (get, set, update: string) => {
  const historyRoute = get(historyRouteAtom) || []
  if (historyRoute[historyRoute.length - 1] === update) return
  set(historyRouteAtom, [...historyRoute, update])
})
