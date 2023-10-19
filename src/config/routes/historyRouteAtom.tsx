import { atom, useAtomValue, useSetAtom } from 'jotai'

const historyRouteAtom = atom<string[]>([])

const historyRouteSetAtom = atom(null, (get, set, update: string) => {
  const historyRoute = get(historyRouteAtom) || []
  if (historyRoute[historyRoute.length - 1] === update) return
  set(historyRouteAtom, [...historyRoute, update])
})

export const useSetHistoryRoute = () => useSetAtom(historyRouteSetAtom)
export const useGetHistoryRoute = () => useAtomValue(historyRouteAtom)
