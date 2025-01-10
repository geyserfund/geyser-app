import { atom, useAtomValue } from 'jotai'

import {
  projectFundingPaymentCardRoutes,
  projectFundingPaymentLightingRoutes,
  projectFundingPaymentOnchainRoutes,
  projectFundingPaymentOnchainStartedRoutes,
  routeMatchForAtom,
} from '@/config/routes/routeGroups'
import { fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom'

export enum PaymentMethods {
  lightning = 'LIGHTNING',
  onChain = 'ONCHAIN',
  card = 'CARD',
}

export const paymentMethodAtom = atom((get) => {
  if (get(isLightingMethodAtom)) {
    return PaymentMethods.lightning
  }

  if (get(isOnchainMethodAtom)) {
    return PaymentMethods.onChain
  }

  if (get(isCardMethodAtom)) {
    return PaymentMethods.card
  }

  return undefined
})

export const isLightingMethodAtom = atom(routeMatchForAtom(projectFundingPaymentLightingRoutes))
export const isCardMethodAtom = atom(routeMatchForAtom(projectFundingPaymentCardRoutes))
export const isOnchainMethodAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainRoutes))

export const isOnchainMethodStartedAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainStartedRoutes))

export const hasStripePaymentMethodAtom = atom((get) => {
  const project = get(fundingProjectAtom)

  if (project.paymentMethods.fiat.stripe) {
    return true
  }

  return false
})

export const useIsLightingMethodAtom = () => useAtomValue(isLightingMethodAtom)
