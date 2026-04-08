import { describe, expect, it } from 'vitest'

import { calculateProjectMatchingPreview, normalizeProjectMatchingUrl } from '@/modules/project/matching/utils/projectMatching.ts'
import { recurringFundingModes } from '@/modules/project/recurring/graphql'
import { ProjectMatchingCurrency, ProjectMatchingFragment, ProjectMatchingStatus, ProjectMatchingType } from '@/types'

const mockBitcoinQuote = {
  quote: 100_000,
  quoteCurrency: 'USD',
} as any

const buildMatching = (overrides: Partial<ProjectMatchingFragment> = {}): ProjectMatchingFragment => ({
  __typename: 'ProjectMatching',
  id: '1',
  projectId: '1',
  ownerUserId: '1',
  sponsorName: 'Sponsor',
  sponsorUrl: null,
  referenceCurrency: ProjectMatchingCurrency.Btcsat,
  matchingType: ProjectMatchingType.OneToOne,
  maxCapAmount: 10_000,
  status: ProjectMatchingStatus.Active,
  startDate: new Date().toISOString(),
  totalMatchedAmount: 0,
  totalMatchedAmountSats: 0,
  totalMatchedAmountUsdCent: 0,
  remainingCapAmount: 10_000,
  ...overrides,
})

describe('project matching preview helpers', () => {
  it('normalizes sponsor URLs by adding https when missing', () => {
    expect(normalizeProjectMatchingUrl('geyser.fund')).toBe('https://geyser.fund/')
  })

  it('calculates one-time donation matching with reward cost and cap clamp', () => {
    const preview = calculateProjectMatchingPreview({
      activeMatching: buildMatching({ remainingCapAmount: 1_500 }),
      bitcoinQuote: mockBitcoinQuote,
      fundingMode: recurringFundingModes.oneTime,
      donationAmountSats: 1_000,
      donationAmountUsdCent: 100,
      rewardsCostSats: 800,
      rewardsCostUsdCents: 80,
      subscriptionCostSats: 0,
      subscriptionCostUsdCents: 0,
    })

    expect(preview.matchedAmountSats).toBe(1_500)
    expect(preview.matchedAmountUsdCents).toBe(150)
    expect(preview.totalImpactSats).toBe(3_300)
    expect(preview.totalImpactUsdCents).toBe(330)
  })

  it('matches only the donation amount for recurring contributions', () => {
    const preview = calculateProjectMatchingPreview({
      activeMatching: buildMatching({ remainingCapAmount: 5_000 }),
      bitcoinQuote: mockBitcoinQuote,
      fundingMode: recurringFundingModes.recurringDonation,
      donationAmountSats: 1_000,
      donationAmountUsdCent: 100,
      rewardsCostSats: 800,
      rewardsCostUsdCents: 80,
      subscriptionCostSats: 0,
      subscriptionCostUsdCents: 0,
    })

    expect(preview.eligibleAmountSats).toBe(1_000)
    expect(preview.matchedAmountSats).toBe(1_000)
    expect(preview.totalImpactSats).toBe(2_000)
  })

  it('matches memberships against USD-denominated caps', () => {
    const preview = calculateProjectMatchingPreview({
      activeMatching: buildMatching({
        referenceCurrency: ProjectMatchingCurrency.Usdcent,
        remainingCapAmount: 2_500,
      }),
      bitcoinQuote: mockBitcoinQuote,
      fundingMode: recurringFundingModes.membership,
      donationAmountSats: 0,
      donationAmountUsdCent: 0,
      rewardsCostSats: 0,
      rewardsCostUsdCents: 0,
      subscriptionCostSats: 30_000,
      subscriptionCostUsdCents: 3_000,
    })

    expect(preview.matchedAmountUsdCents).toBe(2_500)
    expect(preview.matchedAmountSats).toBe(25_000)
    expect(preview.totalImpactUsdCents).toBe(5_500)
    expect(preview.totalImpactSats).toBe(55_000)
  })
})
