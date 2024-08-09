import { atom } from 'jotai'

import { currentRouteAtom } from '@/config/routes'
import { routeMatchForAtom } from '@/config/routes/routeGroups'
import { getPath, PathName } from '@/shared/constants'

import { projectDashboardItems } from './dashboardNavData'

export const currentDashboardItemAtom = atom((get) => {
  const currentMatchRoute = get(currentRouteAtom)

  if (!currentMatchRoute) return

  const currentItem = projectDashboardItems.find(
    (item) => currentMatchRoute.path === getPath(item.path, PathName.projectName),
  )
  return currentItem
})

export const isDashboardMainRouteAtom = atom(routeMatchForAtom([getPath('projectDashboard', PathName.projectName)]))
