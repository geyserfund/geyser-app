import { atom } from 'jotai'

import {
  projectFundingPaymentCardRoutes,
  projectFundingPaymentFiatSwapRoutes,
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
  fiatSwap = 'FIAT_SWAP',
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

  if (get(isFiatSwapMethodAtom)) {
    return PaymentMethods.fiatSwap
  }

  return undefined
})

export const isLightingMethodAtom = atom(routeMatchForAtom(projectFundingPaymentLightingRoutes))
export const isCardMethodAtom = atom(routeMatchForAtom(projectFundingPaymentCardRoutes))
export const isOnchainMethodAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainRoutes))
export const isFiatSwapMethodAtom = atom(routeMatchForAtom(projectFundingPaymentFiatSwapRoutes))

export const isOnchainMethodStartedAtom = atom(routeMatchForAtom(projectFundingPaymentOnchainStartedRoutes))

export const hasStripePaymentMethodAtom = atom((get) => {
  const project = get(fundingProjectAtom)

  if (project.paymentMethods.fiat.stripe) {
    return true
  }

  return false
})
