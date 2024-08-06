import { atom, useAtom, useAtomValue } from 'jotai'

import {
  projectFundingPaymentLightingRoutes,
  projectFundingPaymentOnchainRoutes,
  projectFundingPaymentOnchainStartedRoutes,
  routeMatchForAtom,
} from '@/config/routes/routeGroups'

export enum PaymentMethods {
  lightning = 'LIGHTNING',
  onChain = 'ONCHAIN',
}

export const paymentMethodAtom = atom((get) => {
  if (get(isLightingMethodAtom)) {
    return PaymentMethods.lightning
  }

  if (get(isonChainMethodAtom)) {
    return PaymentMethods.onChain
  }

  return undefined
})

const isLightingMethodAtom = atom(routeMatchForAtom(projectFundingPaymentLightingRoutes))
const isonChainMethodAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainRoutes))

export const isOnchainMethodStartedAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainStartedRoutes))

export const useIsLightingMethodAtom = () => useAtomValue(isLightingMethodAtom)
