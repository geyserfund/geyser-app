import { atom } from 'jotai'

import {
  ProjectPageRoutesWithNavBarForDesktop,
  ProjectPageRoutesWithNavBarForMobile,
  projectPreLaunchRoutes,
  routeMatchForAtom,
} from '@/config/routes/routeGroups'

export const showProjectNavBarForMobileAtom = atom(routeMatchForAtom(ProjectPageRoutesWithNavBarForMobile))

export const showProjectNavBarForDesktopAtom = atom(routeMatchForAtom(ProjectPageRoutesWithNavBarForDesktop))

export const showProjectNavBarForPreLaunchAtom = atom(routeMatchForAtom(projectPreLaunchRoutes))
