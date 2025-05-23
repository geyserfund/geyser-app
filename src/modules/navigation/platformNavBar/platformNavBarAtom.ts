import { atom, useAtomValue } from 'jotai'

import {
  discoveryRoutes,
  guardianCharacterRoutes,
  guardiansRoutes,
  manifestoRoutes,
  profileRoutes,
  projectDashboardRoutes,
  projectFundingRoutes,
  projectPostCreatorRoutes,
  projectRewardCreatorRoutes,
  projectRoutes,
  projectStoryCreatorRoutes,
  routeMatchForAtom,
} from '../../../config/routes/routeGroups'
import { getPath, PathName } from '../../../shared/constants'
import { profileSideNavAtom } from './profileNav/profileSideNavAtom'

const routesForProjectPage = atom(routeMatchForAtom(projectRoutes))

export const isProjectRoutesAtom = atom(
  routeMatchForAtom([
    ...projectRoutes,
    ...projectDashboardRoutes,
    ...projectPostCreatorRoutes,
    ...projectRewardCreatorRoutes,
    ...projectStoryCreatorRoutes,
    ...projectFundingRoutes,
  ]),
)

export const isProjectFundingRoutesAtom = atom(routeMatchForAtom(projectFundingRoutes))

const isProjectMainPageAtom = atom(
  routeMatchForAtom([
    getPath('project', PathName.projectName),
    getPath('projectDraft', PathName.projectName),
    getPath('projectPreLaunch', PathName.projectName),
  ]),
)

const mainProjectPageScrolledPassThresholdAtom = atom(false)

export const shouldShowProjectLogoAtom = atom((get) => {
  const isProjectPage = get(isProjectRoutesAtom)

  if (!isProjectPage) {
    return false
  }

  const isProjectMainPage = get(isProjectMainPageAtom)
  const mainProjectPageScrolledPassThreshold = get(mainProjectPageScrolledPassThresholdAtom)

  if (!isProjectMainPage) {
    return true
  }

  if (mainProjectPageScrolledPassThreshold) {
    return true
  }

  return false
})

/** True if current route is one of the profile routes */
const isProfileRoutesAtom = atom(routeMatchForAtom(profileRoutes))

/** True if shoudl show geyser logo on left of topNavBar */
export const shouldShowGeyserLogoAtom = atom((get) => {
  const isProjectMainPage = get(isProjectMainPageAtom)
  const isProfileRoutes = get(isProfileRoutesAtom)

  return isProjectMainPage || isProfileRoutes
})

/** True if current route is one of the platform routes */
export const isDiscoveryRoutesAtom = atom(routeMatchForAtom(discoveryRoutes))

/** True if current route is the landing page */
export const isLandingPageRouteAtom = atom(routeMatchForAtom([getPath('discoveryLanding')]))

const platformNavBarAnimateAtom = atom((get) => {
  const profileSidebar = get(profileSideNavAtom)
  // const projectSidebar = get(projectSideNavAtom)
  return {
    right: profileSidebar.open,
    left: false,
    // left: projectSidebar.open,
  }
})
export const usePlatformNavBarAnimate = () => useAtomValue(platformNavBarAnimateAtom)

export const useIsProjectPage = () => useAtomValue(routesForProjectPage)

/** True if current route is the guardians page */
const guardiansRoutesAtom = atom(routeMatchForAtom(guardiansRoutes))
export const useIsGuardiansPage = () => useAtomValue(guardiansRoutesAtom)

const guardianCharacterRoutesAtom = atom(routeMatchForAtom(guardianCharacterRoutes))
export const useIsGuardianCharacterPage = () => useAtomValue(guardianCharacterRoutesAtom)

const manifestoRoutesAtom = atom(routeMatchForAtom(manifestoRoutes))
export const useIsManifestoPage = () => useAtomValue(manifestoRoutesAtom)
