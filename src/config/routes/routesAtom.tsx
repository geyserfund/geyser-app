import { AgnosticRouteMatch } from '@sentry/react/types/types'
import { atom, Getter, useSetAtom } from 'jotai'
import { RouteObject } from 'react-router-dom'

import { getPath, PathName } from '../../constants'

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

export const entryCreationRoutes = [
  getPath('projectEntryCreation', PathName.projectId),
  getPath('projectEntryDetails', PathName.projectId, PathName.entryId),
  getPath('projectEntryPreview', PathName.projectId, PathName.entryId),
]

export const projectDashboardRoutes = [
  getPath('projectDashboard', PathName.projectId),
  getPath('dashboardContributors', PathName.projectId),
  getPath('dashboardDetails', PathName.projectId),
  getPath('dashboardWallet', PathName.projectId),
  getPath('dashboardSettings', PathName.projectId),
  getPath('dashboardStats', PathName.projectId),
  getPath('dashboardStory', PathName.projectId),
]

export const projectCreatorRoutes = [
  getPath('projectContributors', PathName.projectId),
  getPath('projectInsights', PathName.projectId),
  getPath('projectOverview', PathName.projectId),
]

export const projectRoutes = [
  getPath('project', PathName.projectId),
  getPath('projectEntries', PathName.projectId),
  getPath('projectMilestones', PathName.projectId),
  getPath('projectRewards', PathName.projectId),
  ...projectCreatorRoutes,
]

export const grantRoutes = [
  getPath('grants'),
  getPath('grants', PathName.grantId),
]

export const landingRoutes = [
  getPath('index'),
  getPath('landingPage'),
  getPath('landingFeed'),
]

export const fallBackRoutes = [getPath('notFound'), getPath('notAuthorized')]
