import { atom, useAtomValue } from 'jotai'

import {
  projectFundingPaymentLightingRoutes,
  projectFundingPaymentOnchainRoutes,
  projectFundingPaymentOnchainStartedRoutes,
  routeMatchForAtom,
} from '@/config/routes/routeGroups'
import { fundingFormStateAtom, fundingProjectAtom } from '@/modules/project/funding/state/fundingFormAtom'

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

const listOfProjectsThatHaveStripePayment = []

export const hasCardPaymentMethodAtom = atom((get) => {
  const project = get(fundingProjectAtom)
})

export const useIsLightingMethodAtom = () => useAtomValue(isLightingMethodAtom)
