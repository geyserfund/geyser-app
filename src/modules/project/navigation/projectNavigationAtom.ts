import { atom } from 'jotai'

import { routeMatchForAtom } from '@/config'
import {
  ProjectPageRoutesWithNavBarForDesktop,
  ProjectPageRoutesWithNavBarForMobile,
} from '@/config/routes/routeGroups'

export const showProjectNavBarForMobileAtom = atom(routeMatchForAtom(ProjectPageRoutesWithNavBarForMobile))

export const showProjectNavBarForDesktopAtom = atom(routeMatchForAtom(ProjectPageRoutesWithNavBarForDesktop))
