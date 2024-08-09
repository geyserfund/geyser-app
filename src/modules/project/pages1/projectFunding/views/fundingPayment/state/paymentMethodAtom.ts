import { atom, useAtomValue } from 'jotai'

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

  if (get(isOnchainMethodAtom)) {
    return PaymentMethods.onChain
  }

  return undefined
})

export const isLightingMethodAtom = atom(routeMatchForAtom(projectFundingPaymentLightingRoutes))
export const isOnchainMethodAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainRoutes))

export const isOnchainMethodStartedAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainStartedRoutes))

export const useIsLightingMethodAtom = () => useAtomValue(isLightingMethodAtom)
