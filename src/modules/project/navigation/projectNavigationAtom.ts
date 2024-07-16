import { atom } from 'jotai'

import { ProjectPageRoutesWithNavBar, routeMatchForAtom } from '@/config'

export const showProjectNavBarAtom = atom(routeMatchForAtom(ProjectPageRoutesWithNavBar))
