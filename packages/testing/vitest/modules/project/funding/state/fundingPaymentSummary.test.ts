import { describe, expect, it } from 'vitest'

import {
  getActiveFundingPaymentDetails,
  getFundingPaymentAmountDueSats,
} from '@/modules/project/pages/projectFunding/views/fundingPayment/components/FundingPaymentSummary.utils.ts'
import { PaymentMethods } from '@/modules/project/pages/projectFunding/views/fundingPayment/state/paymentMethodAtom.ts'
import { FundingContributionPaymentDetailsFragment } from '@/types/index.ts'

const fundingPaymentDetails = {
  onChainToRskSwap: {
    address: 'bcrt1-onchain',
    amountDue: 136_564,
    fees: [],
    paymentId: '1',
    swapJson: '{}',
  },
  lightningToRskSwap: {
    amountDue: 136_565,
    amountToClaim: 136_000,
    fees: [],
    lightningInvoiceId: 'invoice-id',
    paymentId: '2',
    paymentRequest: 'lnbc...',
    swapJson: '{}',
  },
} as FundingContributionPaymentDetailsFragment

describe('FundingPaymentSummary amount source', () => {
  it('uses the on-chain swap amountDue as the summary total instead of a derived frontend total', () => {
    const derivedFrontendTotalSats = 136_565

    expect(getFundingPaymentAmountDueSats(PaymentMethods.onChain, fundingPaymentDetails)).toBe(136_564)
    expect(getFundingPaymentAmountDueSats(PaymentMethods.onChain, fundingPaymentDetails)).not.toBe(
      derivedFrontendTotalSats,
    )
  })

  it('uses the active payment method details when multiple payment details exist', () => {
    expect(getActiveFundingPaymentDetails(PaymentMethods.lightning, fundingPaymentDetails)).toBe(
      fundingPaymentDetails.lightningToRskSwap,
    )
    expect(getActiveFundingPaymentDetails(PaymentMethods.onChain, fundingPaymentDetails)).toBe(
      fundingPaymentDetails.onChainToRskSwap,
    )
  })
})
