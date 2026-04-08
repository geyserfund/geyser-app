import { atom } from 'jotai'

import type {
  ProjectSubscriptionPlan,
  RecurringContributionCurrency,
  RecurringContributionKind,
  RecurringInterval,
  RecurringPaymentMethod,
} from '@/modules/project/recurring/graphql'

export type RecurringContributionRenewalState = {
  managementNonce: string
  recurringContributionId: string
  kind: RecurringContributionKind
  paymentMethod: RecurringPaymentMethod
  amount: number
  currency: RecurringContributionCurrency
  interval: RecurringInterval
  userId?: string | null
  projectSubscriptionPlan?: ProjectSubscriptionPlan | null
}

export const recurringContributionRenewalAtom = atom<RecurringContributionRenewalState | null>(null)

export const isRecurringContributionRenewalAtom = atom((get) => Boolean(get(recurringContributionRenewalAtom)))

