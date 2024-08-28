import { atom } from 'jotai'

import {
  ProjectPageRoutesWithNavBarForDesktop,
  ProjectPageRoutesWithNavBarForMobile,
  routeMatchForAtom,
} from '@/config/routes/routeGroups'

export const showProjectNavBarForMobileAtom = atom(routeMatchForAtom(ProjectPageRoutesWithNavBarForMobile))

export const showProjectNavBarForDesktopAtom = atom(routeMatchForAtom(ProjectPageRoutesWithNavBarForDesktop))
