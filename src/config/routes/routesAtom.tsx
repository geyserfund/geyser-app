import { AgnosticRouteMatch } from '@sentry/react/types/types'
import { atom, Getter, useSetAtom } from 'jotai'
import { RouteObject } from 'react-router-dom'

const matchRoutesAtom = atom<AgnosticRouteMatch<string, RouteObject>[] | null>(
  [],
)
const currentRouteAtom = atom((get) => {
  const matchRoutes = get(matchRoutesAtom)
  const matchLength = matchRoutes?.length || 0

  let matchRoute: RouteObject | undefined

  if (matchLength > 0 && matchRoutes) {
    if (
      matchLength > 1 &&
      matchRoutes?.[matchLength - 1]?.route.index === true
    ) {
      matchRoute = matchRoutes?.[matchLength - 2]?.route
    } else {
      matchRoute = matchRoutes?.[matchLength - 1]?.route
    }
  }

  return matchRoute
})

export const useSetMatchRoutes = () => useSetAtom(matchRoutesAtom)

export const routeMatchForAtom = (routes: string[]) => (get: Getter) => {
  const matchRoute = get(currentRouteAtom)
  if (!matchRoute) return false
  return routes.some((route) => route === matchRoute.path)
}
