import { atom } from 'jotai'

import { projectFundingOnchainRefundRoutes, routeMatchForAtom } from '@/config/routes/routeGroups'

/** Is true if the route is project funding onchain refund route */
export const isOnChainRefundRoutesAtom = atom(routeMatchForAtom(projectFundingOnchainRefundRoutes))
