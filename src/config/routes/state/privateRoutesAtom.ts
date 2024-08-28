import { atom, useAtomValue } from 'jotai'

import { getPath, PathName } from '../../../shared/constants'
import {
  creatorProjectCreationRoutes as routesForPrivateProjectLaunch,
  profileSettingsRoutes,
  projectCreatorRoutes as routesForProjectCreator,
  projectPostCreatorRoutes,
  routeMatchForAtom,
} from '../routeGroups'

const routesForPrivateProjectLaunchAtom = atom(routeMatchForAtom(routesForPrivateProjectLaunch))

export const routesForProjectCreatorAtom = atom(routeMatchForAtom(routesForProjectCreator))

export const routeMatchForProjectPageAtom = atom(routeMatchForAtom([getPath('project', PathName.projectId)]))

const routesForEntryCreationAtom = atom(routeMatchForAtom(projectPostCreatorRoutes))

const routesForProfileEditAtom = atom(routeMatchForAtom(profileSettingsRoutes))

export const useRouteMatchesForPrivateRoute = () => {
  const isProjectCreatorRoute = useAtomValue(routesForProjectCreatorAtom)
  const isEntryCreationRoute = useAtomValue(routesForEntryCreationAtom)
  const isPrivateProjectLaunchRoute = useAtomValue(routesForPrivateProjectLaunchAtom)
  const isProfileSettingsRoute = useAtomValue(routesForProfileEditAtom)
  return {
    isProjectCreatorRoute,
    isEntryCreationRoute,
    isPrivateProjectLaunchRoute,
    isProfileSettingsRoute,
  }
}
