import { atom, Getter, useAtomValue, useSetAtom } from 'jotai'
import { RouteMatch, RouteObject } from 'react-router-dom'

import { getPath, PathName } from '../../shared/constants'

const matchRoutesAtom = atom<RouteMatch<string, RouteObject>[] | null>([])
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

export const useSetMatchRoutes = () => useSetAtom(matchRoutesAtom)

export const useCurrentRouteMatchAtom = () => useAtomValue(currentRouteAtom)

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

export const ProjectPageDashboardInternalRoutes = [
  getPath('dashboardAnalytics', PathName.projectName),
  getPath('dashboardSales', PathName.projectName),
  getPath('dashboardAccounting', PathName.projectName),
  getPath('dashboardInfo', PathName.projectName),
  getPath('dashboardDetails', PathName.projectName),
  getPath('dashboardStory', PathName.projectName),
  getPath('dashboardWallet', PathName.projectName),
  getPath('dashboardNostr', PathName.projectName),
  getPath('dashboardSettings', PathName.projectName),
  getPath('dashboardAffiliates', PathName.projectName),
]

export const projectDashboardRoutes = [
  getPath('projectDashboard', PathName.projectName),
  ...ProjectPageDashboardInternalRoutes,
]

export const projectRoutes = [
  getPath('project', PathName.projectName),
  getPath('projectPosts', PathName.projectName),
  getPath('projectGoals', PathName.projectName),
  getPath('projectRewards', PathName.projectName),
  getPath('projectLeaderboard', PathName.projectName),
]

export const projectRewardCreatorRoutes = [
  getPath('projectRewardCreate', PathName.projectName),
  getPath('projectRewardEdit', PathName.projectName, PathName.rewardId),
]

export const projectPostCreatorRoutes = [
  getPath('projectPostCreate', PathName.projectName),
  getPath('projectPostEdit', PathName.projectName, PathName.postId),
]

export const ProjectPageRoutesWithNavBarForDesktop = [...projectRoutes, ...projectDashboardRoutes]

export const ProjectPageRoutesWithNavBarForMobile = [
  ...projectRoutes,
  getPath('projectDashboard', PathName.projectName),
]

export const projectCreatorRoutes = [
  ...projectDashboardRoutes,
  ...projectRewardCreatorRoutes,
  ...projectPostCreatorRoutes,
]

export const grantRoutes = [getPath('grants'), getPath('grants', PathName.grantId)]

export const landingRoutes = [getPath('index'), getPath('landingPage'), getPath('landingFeed')]

export const fallBackRoutes = [getPath('notFound'), getPath('notAuthorized')]
