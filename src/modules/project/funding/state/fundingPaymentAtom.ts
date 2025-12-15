import { atom } from 'jotai'

import { FundingContributionPaymentDetailsFragment } from '@/types/index.ts'

/** Default empty state for funding payment details */
const defaultFundingPaymentDetails: FundingContributionPaymentDetailsFragment = {
  fiat: {
    stripeClientSecret: '',
  },
  fiatToLightningSwap: {
    checkoutUrl: '',
  },
  lightning: {
    lightningInvoiceId: '',
    paymentRequest: '',
    amountDue: 0,
    fees: [],
  },
  onChainSwap: {
    swapJson: '',
    address: '',
    amountDue: 0,
    fees: [],
  },
  lightningToRskSwap: {
    lightningInvoiceId: '',
    paymentRequest: '',
    swapJson: '',
    paymentId: '',
    amountToClaim: 0,
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
