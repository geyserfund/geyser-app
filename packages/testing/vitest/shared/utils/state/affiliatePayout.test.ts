import { describe, expect, it } from 'vitest'

import {
  DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE,
  formatEffectiveAffiliatePayoutRate,
  GEYSER_PLATFORM_FEE_RATE,
  GEYSER_PROMOTION_FEE_RATE,
} from '../../../../../../src/shared/utils/affiliatePayout.ts'

describe('affiliatePayout utils', () => {
  it('formats the default ambassador network payout as 5%', () => {
    expect(
      formatEffectiveAffiliatePayoutRate(DEFAULT_CONTRIBUTION_REFERRAL_PAYOUT_RATE, GEYSER_PROMOTION_FEE_RATE),
    ).toBe('5%')
  })

  it('keeps project referral platform fee calculations unchanged', () => {
    expect(formatEffectiveAffiliatePayoutRate(0.5, GEYSER_PLATFORM_FEE_RATE)).toBe('2.5%')
  })
})
