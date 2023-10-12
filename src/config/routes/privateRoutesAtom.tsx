import { atom, useAtomValue } from 'jotai'

import { getPath } from '../../constants'
import {
  entryCreationRoutes as routesForEntryCreation,
  projectCreatorRoutes as routesForProjectCreator,
  routeMatchForAtom,
} from './routesAtom'

const routesForPrivateProjectLaunch = [getPath('privateProjectLaunch')]
const routesForPrivateProjectLaunchAtom = atom(
  routeMatchForAtom(routesForPrivateProjectLaunch),
)

const routesForProjectCreatorAtom = atom(
  routeMatchForAtom(routesForProjectCreator),
)

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
