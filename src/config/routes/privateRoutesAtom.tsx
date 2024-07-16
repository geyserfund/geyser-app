import { atom, useAtomValue } from 'jotai'

import { getPath, PathName } from '../../shared/constants'
import {
  entryCreationRoutes as routesForEntryCreation,
  projectCreationRoutes as routesForPrivateProjectLaunch,
  projectCreatorRoutes as routesForProjectCreator,
  routeMatchForAtom,
} from './routesAtom'

const routesForPrivateProjectLaunchAtom = atom(routeMatchForAtom(routesForPrivateProjectLaunch))

export const routesForProjectCreatorAtom = atom(routeMatchForAtom(routesForProjectCreator))

export const routeMatchForProjectPageAtom = atom(routeMatchForAtom([getPath('project', PathName.projectId)]))

const routesForEntryCreationAtom = atom(routeMatchForAtom(routesForEntryCreation))

export const useRouteMatchesForPrivateRoute = () => {
  const isProjectCreatorRoute = useAtomValue(routesForProjectCreatorAtom)
  const isEntryCreationRoute = useAtomValue(routesForEntryCreationAtom)
  const isPrivateProjectLaunchRoute = useAtomValue(routesForPrivateProjectLaunchAtom)
  return {
    isProjectCreatorRoute,
    isEntryCreationRoute,
    isPrivateProjectLaunchRoute,
  }
}
