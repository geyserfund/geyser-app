import { atom, useAtomValue } from 'jotai'

import {
  projectDashboardRoutes,
  projectPostCreatorRoutes,
  projectRewardCreatorRoutes,
  projectRoutes,
  routeMatchForAtom,
} from '../../../config/routes/routeGroups'
import { getPath, PathName } from '../../../shared/constants'
import { profileSideNavAtom } from '../profileNav/profileSideNavAtom'

const routesForProjectPage = atom(routeMatchForAtom(projectRoutes))

const isProjectRoutesAtom = atom(
  routeMatchForAtom([
    ...projectRoutes,
    ...projectDashboardRoutes,
    ...projectPostCreatorRoutes,
    ...projectRewardCreatorRoutes,
  ]),
)
const isProjectMainPageAtom = atom(routeMatchForAtom([getPath('project', PathName.projectName)]))

const mainProjectPageScrolledPassThresholdAtom = atom(false)

export const shouldShowProjectLogoAtom = atom((get) => {
  const isProjectPage = get(isProjectRoutesAtom)

  console.log('checking isProjectPage', isProjectPage)
  if (!isProjectPage) {
    return false
  }

  const isProjectMainPage = get(isProjectMainPageAtom)
  const mainProjectPageScrolledPassThreshold = get(mainProjectPageScrolledPassThresholdAtom)
  console.log('checking isProjectMainPage', isProjectMainPage)
  console.log('checking mainProjectPageScrolledPassThreshold', mainProjectPageScrolledPassThreshold)

  if (!isProjectMainPage) {
    return true
  }

  if (mainProjectPageScrolledPassThreshold) {
    return true
  }

  return false
})

const topNavBarAnimateAtom = atom((get) => {
  const profileSidebar = get(profileSideNavAtom)
  // const projectSidebar = get(projectSideNavAtom)
  return {
    right: profileSidebar.open,
    left: false,
    // left: projectSidebar.open,
  }
})
export const useTopNavBarAnimate = () => useAtomValue(topNavBarAnimateAtom)

export const useIsProjectPage = () => useAtomValue(routesForProjectPage)
