import { atom, useAtomValue } from 'jotai'

import { getPath, PathName } from '../../../shared/constants'
import {
  allCreatorProjectCreationRoutes,
  privateCreatorProjectCreationRoutes as routesForPrivateProjectLaunch,
  profileSettingsRoutes,
  projectCreatorRoutes as routesForProjectCreator,
  projectPostCreatorRoutes,
  routeMatchForAtom,
} from '../routeGroups'

export const isRouteForProjectCreationAtom = atom(routeMatchForAtom(allCreatorProjectCreationRoutes))

/** This atom is used to check if the current route is a private project creation route */
export const isPrivateRouteForProjectCreationAtom = atom(routeMatchForAtom(routesForPrivateProjectLaunch))

export const routesForProjectCreatorAtom = atom(routeMatchForAtom(routesForProjectCreator))

export const routeMatchForProjectPageAtom = atom(routeMatchForAtom([getPath('project', PathName.projectId)]))

const routesForEntryCreationAtom = atom(routeMatchForAtom(projectPostCreatorRoutes))

const routesForProfileEditAtom = atom(routeMatchForAtom(profileSettingsRoutes))

export const useRouteMatchesForPrivateRoute = () => {
  const isProjectCreatorRoute = useAtomValue(routesForProjectCreatorAtom)
  const isEntryCreationRoute = useAtomValue(routesForEntryCreationAtom)
  const isPrivateProjectLaunchRoute = useAtomValue(isPrivateRouteForProjectCreationAtom)
  const isProfileSettingsRoute = useAtomValue(routesForProfileEditAtom)
  return {
    isProjectCreatorRoute,
    isEntryCreationRoute,
    isPrivateProjectLaunchRoute,
    isProfileSettingsRoute,
  }
}
