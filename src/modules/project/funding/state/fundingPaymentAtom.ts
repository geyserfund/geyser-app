import { atom } from 'jotai'

import { FundingContributionPaymentDetailsFragment } from '@/types/index.ts'

/** Default empty state for funding payment details */
const defaultFundingPaymentDetails: FundingContributionPaymentDetailsFragment = {
  fiat: {
    stripeClientSecret: '',
  },
  fiatSwap: {
    checkoutUrl: '',
  },
  lightning: {
    lightningInvoiceId: '',
    paymentRequest: '',
  },
  onChainSwap: {
    swapJson: '',
    address: '',
  },
  lightningToRskSwap: {
    lightningInvoiceId: '',
    paymentRequest: '',
    swapJson: '',
    paymentId: '',
    amountDue: 0,
    fees: [],
  },
  onChainToRskSwap: {
    address: '',
    swapJson: '',
    paymentId: '',
    amountDue: 0,
    fees: [],
  },
}

/** Atom for storing funding payment details */
export const fundingPaymentDetailsAtom = atom<FundingContributionPaymentDetailsFragment>(defaultFundingPaymentDetails)

/** Atom for making partial updates to the funding payment details */
export const fundingPaymentDetailsPartialUpdateAtom = atom(
  null,
  (get, set, partial: Partial<FundingContributionPaymentDetailsFragment>) => {
    const current = get(fundingPaymentDetailsAtom)
    set(fundingPaymentDetailsAtom, { ...current, ...partial })
  },
)

/** Reset atom to clear all funding payment details */
export const resetFundingPaymentDetailsAtom = atom(null, (_, set) =>
  set(fundingPaymentDetailsAtom, defaultFundingPaymentDetails),
)
