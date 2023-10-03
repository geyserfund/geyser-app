import { atom, useAtomValue } from 'jotai'

import { getPath } from '../../constants'
import {
  entryCreationRoutes,
  projectCreatorRoutes,
  routeMatchForAtom,
} from './routesAtom'

const routesForPrivateProjectLaunch = [getPath('privateProjectLaunch')]
const routesForPrivateProjectLaunchAtom = atom(
  routeMatchForAtom(routesForPrivateProjectLaunch),
)

const routesForProjectCreator = projectCreatorRoutes
const routesForProjectCreatorAtom = atom(
  routeMatchForAtom(routesForProjectCreator),
)

const routesForEntryCreation = entryCreationRoutes
const routesForEntryCreationAtom = atom(
  routeMatchForAtom(routesForEntryCreation),
)

export const useRouteMatchesForPrivateRoute = () => {
  const isProjectCreatorRoute = useAtomValue(routesForProjectCreatorAtom)
  const isEntryCreationRoute = useAtomValue(routesForEntryCreationAtom)
  const isPrivateProjectLaunchRoute = useAtomValue(
    routesForPrivateProjectLaunchAtom,
  )
  return {
    isProjectCreatorRoute,
    isEntryCreationRoute,
    isPrivateProjectLaunchRoute,
  }
}
