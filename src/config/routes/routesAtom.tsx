import { atom, Getter, useSetAtom } from 'jotai'
import { RouteMatch, RouteObject } from 'react-router-dom'

import { getPath, PathName } from '../../constants'

const matchRoutesAtom = atom<RouteMatch<string, RouteObject>[] | null>([])
const currentRouteAtom = atom((get) => {
  const matchRoutes = get(matchRoutesAtom)
  const matchLength = matchRoutes?.length || 0

  let matchRoute: RouteObject | undefined

  if (matchLength > 0 && matchRoutes) {
    if (matchLength > 1 && matchRoutes?.[matchLength - 1]?.route.index === true) {
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

export const projectCreationRoutes = [
  getPath('privateProjectLaunch'),
  getPath('launchProject', PathName.projectId),
  getPath('launchProjectDetails', PathName.projectId),
  getPath('launchProjectStory', PathName.projectId),
  getPath('launchProjectWithNode', PathName.projectId),
]

export const entryCreationRoutes = [
  getPath('projectEntryCreation', PathName.projectName),
  getPath('projectEntryDetails', PathName.projectName, PathName.entryId),
  getPath('projectEntryPreview', PathName.projectName, PathName.entryId),
]

export const projectDashboardRoutes = [
  getPath('projectDashboard', PathName.projectName),
  getPath('dashboardContributors', PathName.projectName),
  getPath('dashboardDetails', PathName.projectName),
  getPath('dashboardWallet', PathName.projectName),
  getPath('dashboardSettings', PathName.projectName),
  getPath('dashboardStats', PathName.projectName),
  getPath('dashboardStory', PathName.projectName),
]

export const projectCreatorRoutes = [
  getPath('projectContributors', PathName.projectName),
  getPath('projectInsights', PathName.projectName),
  getPath('projectManageRewards', PathName.projectManageRewards),
  getPath('projectCreateReward', PathName.projectCreateReward),
  getPath('projectEditReward', PathName.projectEditReward, PathName.rewardId),
]

export const projectRoutes = [
  getPath('project', PathName.projectName),
  getPath('projectEntries', PathName.projectName),
  getPath('projectGoals', PathName.projectName),
  getPath('projectRewards', PathName.projectName),
  ...projectCreatorRoutes,
]

export const grantRoutes = [getPath('grants'), getPath('grants', PathName.grantId)]

export const landingRoutes = [getPath('index'), getPath('landingPage'), getPath('landingFeed')]

export const fallBackRoutes = [getPath('notFound'), getPath('notAuthorized')]
