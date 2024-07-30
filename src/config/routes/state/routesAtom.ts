import { atom, Getter } from 'jotai'
import { RouteMatch, RouteObject } from 'react-router-dom'

/** Atom to store matches for all routes for the platform */
export const matchRoutesAtom = atom<RouteMatch<string, RouteObject>[] | null>([])

/**
 * Derived Atom, that gives 1 matched route
 * - Match the currentRoute.path with the getPath() function to find matches
 */
export const currentRouteAtom = atom((get) => {
  const matchRoutes = get(matchRoutesAtom)
  const matchLength = matchRoutes?.length || 0

  let matchRoute: RouteObject | undefined

  if (matchLength > 0 && matchRoutes) {
    /** This is because for index routes, it generates an extra match with only '/' extra at the end */
    if (matchLength > 1 && matchRoutes?.[matchLength - 1]?.route.index === true) {
      matchRoute = matchRoutes?.[matchLength - 2]?.route
    } else {
      matchRoute = matchRoutes?.[matchLength - 1]?.route
    }
  }

  return matchRoute
})

/** Get the functions you can pass into a derived atom definition */
export const routeMatchForAtom =
  (
    /** arrray of route patterns you'd like to match with the current route */
    routes: string[],
  ) =>
  (get: Getter) => {
    const matchRoute = get(currentRouteAtom)
    if (!matchRoute) return false
    return routes.some((route) => route === matchRoute.path)
  }
