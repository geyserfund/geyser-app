import { atom } from 'jotai'

import { projectFundingPaymentCreatedRoutes, routeMatchForAtom } from '@/config/routes/routeGroups'

export const isFundingPaymentStartedRouteAtom = atom(routeMatchForAtom(projectFundingPaymentCreatedRoutes))
