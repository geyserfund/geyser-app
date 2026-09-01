import i18next from 'i18next'
import { createStore } from 'jotai'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'

import { SATOSHIS_IN_BTC } from '@/shared/constants' // Import constant
import { usdRateAtom } from '@/shared/state/btcRateAtom' // Correct import for usdRateAtom
// Import types needed here
import { ProjectFundingStrategy } from '@/types'

// Import atoms under test
import {
  fundingFormStateAtom,
  FundingProjectState,
  isFundingInputAmountValidAtom,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  subscriptionCostAtoms,
  tipAtoms,
  totalAmountSatsAtom,
  totalAmountUsdCentAtom,
  updateFundingFormSubscriptionAtom,
} from '../../../../../../../src/modules/project/funding/state/fundingFormAtom.ts'
import { recurringIntervals } from '../../../../../../../src/modules/project/recurring/graphql.ts'
// Import dependent source atoms
import { projectAtom, ProjectState } from '../../../../../../../src/modules/project/state/projectAtom.ts'
import { rewardsAtom } from '../../../../../../../src/modules/project/state/rewardsAtom.ts'
import { subscriptionsAtom } from '../../../../../../../src/modules/project/state/subscriptionAtom.ts'
import { walletAtom } from '../../../../../../../src/modules/project/state/walletAtom.ts'
// Import mocks from the new file
import { initialTestState, mockBitcoinQuote, mockProjectDataUsd, mockUsdRate } from './fundingFormAtom.mock.ts'
// Import test helpers
import { calculateExpectedTotalUsdCent } from './fundingFormAtom.test.helpers.ts'

// --- Test Setup ---
const createTestStore = (projectData: FundingProjectState = mockProjectDataUsd) => {
  const store = createStore()
  store.set(usdRateAtom, mockUsdRate)
  const { rewards, subscriptions, wallet, ...projData } = projectData
  store.set(projectAtom, projData as ProjectState)
  store.set(walletAtom, wallet)
  store.set(rewardsAtom, rewards)
  store.set(subscriptionsAtom, subscriptions ?? [])
  // Use imported initial state
  store.set(fundingFormStateAtom, initialTestState)
  return store
}

describe('fundingFormAtom Tests', () => {
  let store: ReturnType<typeof createStore>
  // const SATOSHI_RATE = 100_000_000 // No longer needed for test calculations

  beforeAll(async () => {
    await i18next.init({
      fallbackLng: 'en',
      interpolation: { escapeValue: false },
      resources: {},
      returnNull: false,
    })
  })

  // --- Subscription Tests ---
  describe('Subscription Logic', () => {
    beforeEach(() => {
      store = createTestStore(mockProjectDataUsd)
    })

    it('updateFundingFormSubscriptionAtom should add a USD cent subscription', () => {
      store.set(updateFundingFormSubscriptionAtom, { id: 201 })
      const state = store.get(fundingFormStateAtom)
      const derivedSubCosts = store.get(subscriptionCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedSubCostUsdCent = 500
      const expectedSubCostSats = 20000

      expect(state.subscription.subscriptionId).toBe(201)
      expect(state.subscription.amountUsdCent).toBe(expectedSubCostUsdCent)
      expect(state.subscription.amountBtcSat).toBe(expectedSubCostSats)
      expect(state.subscription.interval).toBe(recurringIntervals.monthly)
      expect(state.subscription.name).toBe('Monthly USD Supporter')
      expect(derivedSubCosts).toEqual({ sats: expectedSubCostSats, usdCents: expectedSubCostUsdCent, base: 500 })
      expect(totalSats).toBe(state.donationAmount + derivedSubCosts.sats + tip.sats)
      expect(totalUsdCent).toBe(calculateExpectedTotalUsdCent(totalSats, mockBitcoinQuote))
    })

    it('updateFundingFormSubscriptionAtom should add a SATS subscription', () => {
      store.set(updateFundingFormSubscriptionAtom, { id: 202 })
      const state = store.get(fundingFormStateAtom)
      const derivedSubCosts = store.get(subscriptionCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedSubCostUsdCent = 2500
      const expectedSubCostSats = 100000

      expect(state.subscription.subscriptionId).toBe(202)
      expect(state.subscription.amountUsdCent).toBe(expectedSubCostUsdCent)
      expect(state.subscription.amountBtcSat).toBe(expectedSubCostSats)
      expect(state.subscription.interval).toBe(recurringIntervals.yearly)
      expect(state.subscription.name).toBe('Annual SATS Backer')
      expect(derivedSubCosts).toEqual({ sats: expectedSubCostSats, usdCents: expectedSubCostUsdCent, base: 2500 })
      expect(totalSats).toBe(state.donationAmount + derivedSubCosts.sats + tip.sats)
      expect(totalUsdCent).toBe(calculateExpectedTotalUsdCent(totalSats, mockBitcoinQuote))
    })

    it('updateFundingFormSubscriptionAtom should overwrite previous subscription', () => {
      store.set(updateFundingFormSubscriptionAtom, { id: 201 })
      store.set(updateFundingFormSubscriptionAtom, { id: 202 })
      const state = store.get(fundingFormStateAtom)
      const derivedSubCosts = store.get(subscriptionCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedSubCostUsdCent = 2500
      const expectedSubCostSats = 100000

      expect(state.subscription.subscriptionId).toBe(202)
      expect(state.subscription.amountUsdCent).toBe(expectedSubCostUsdCent)
      expect(state.subscription.amountBtcSat).toBe(expectedSubCostSats)
      expect(derivedSubCosts).toEqual({ sats: expectedSubCostSats, usdCents: expectedSubCostUsdCent, base: 2500 })
      expect(totalSats).toBe(state.donationAmount + derivedSubCosts.sats + tip.sats)
      expect(totalUsdCent).toBe(calculateExpectedTotalUsdCent(totalSats, mockBitcoinQuote))
    })
  })

  // Shared tests or tests not dependent on project currency can go here
  beforeEach(() => {
    // Reset store with default USD project before each top-level test
    store = createTestStore(mockProjectDataUsd)
  })

  it('setFundFormTargetAtom should update state based on event target', () => {
    const mockEvent = { target: { name: 'email', value: 'test@example.com' } }
    store.set(setFundFormTargetAtom, mockEvent)
    const state = store.get(fundingFormStateAtom)
    expect(state.email).toBe('test@example.com')
  })

  it('setFundFormStateAtom should update a specific field', () => {
    store.set(setFundFormStateAtom, 'comment', 'This is a test comment')
    const state = store.get(fundingFormStateAtom)
    expect(state.comment).toBe('This is a test comment')
  })

  it('setFundFormStateAtom should update donationAmount and sync donationAmountUsdCent', () => {
    store.set(setFundFormStateAtom, 'donationAmount', 10000) // 10,000 sats
    const state = store.get(fundingFormStateAtom)
    const expectedUsdCent = Math.round((10000 / SATOSHIS_IN_BTC) * mockUsdRate * 100)
    expect(state.donationAmount).toBe(10000)
    expect(state.donationAmountUsdCent).toBe(expectedUsdCent)

    // Check derived totals
    const expectedTipSats = Math.round((10000 * state.geyserTipPercent) / 100) // Tip on donation only
    const expectedTipUsdCent = Math.round((expectedTipSats / SATOSHIS_IN_BTC) * mockUsdRate * 100)
    expect(store.get(tipAtoms)).toEqual({ sats: expectedTipSats, usdCents: expectedTipUsdCent })
    expect(store.get(totalAmountSatsAtom)).toBe(10000 + expectedTipSats) // donation + tip
    expect(store.get(totalAmountUsdCentAtom)).toBe(expectedUsdCent + expectedTipUsdCent) // donationUsd + tipUsd
  })

  it('setFundFormStateAtom should update geyserTipPercent and affect derived totals', () => {
    store.set(setFundFormStateAtom, 'donationAmount', 10000) // 10,000 sats
    store.set(setFundFormStateAtom, 'geyserTipPercent', 5) // Update tip to 5%

    const state = store.get(fundingFormStateAtom)
    expect(state.geyserTipPercent).toBe(5)

    const expectedTipSats = Math.round((10000 * 5) / 100) // 500
    const expectedTipUsdCent = Math.round((expectedTipSats / SATOSHIS_IN_BTC) * mockUsdRate * 100)

    const expectedDonationUsdCent = Math.round((10000 / SATOSHIS_IN_BTC) * mockUsdRate * 100)

    // Check derived tip and totals
    expect(store.get(tipAtoms)).toEqual({ sats: expectedTipSats, usdCents: expectedTipUsdCent })
    expect(store.get(totalAmountSatsAtom)).toBe(10000 + expectedTipSats)
    expect(store.get(totalAmountUsdCentAtom)).toBe(expectedDonationUsdCent + expectedTipUsdCent)
  })

  it('setFundFormStateAtom should update donationAmountUsdCent and sync donationAmount', () => {
    const newDonationUsdCent = 5000 // Set donation to $50.00
    store.set(setFundFormStateAtom, 'donationAmountUsdCent', newDonationUsdCent)
    const state = store.get(fundingFormStateAtom)
    const expectedSats = Math.round((newDonationUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

    expect(state.donationAmountUsdCent).toBe(newDonationUsdCent)
    expect(state.donationAmount).toBe(expectedSats)

    // Check derived totals
    const expectedTipSats = Math.round((expectedSats * state.geyserTipPercent) / 100)
    const expectedTipUsdCent = Math.round((expectedTipSats / SATOSHIS_IN_BTC) * mockUsdRate * 100)
    expect(store.get(tipAtoms)).toEqual({ sats: expectedTipSats, usdCents: expectedTipUsdCent })
    expect(store.get(totalAmountSatsAtom)).toBe(expectedSats + expectedTipSats)
    expect(store.get(totalAmountUsdCentAtom)).toBe(newDonationUsdCent + expectedTipUsdCent)
  })

  describe('Funding input minimum validation', () => {
    it('requires Take-it-all projects to meet a 2500 sats total payment minimum', () => {
      store = createTestStore({
        ...mockProjectDataUsd,
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
      })

      store.set(setFundFormStateAtom, 'donationAmount', 2000)

      expect(store.get(totalAmountSatsAtom)).toBe(2042)
      expect(store.get(isFundingInputAmountValidAtom)).toEqual({
        title: 'The payment minimum is 2500 satoshi.',
        description: 'Please update the amount.',
        valid: false,
      })
    })

    it('allows Take-it-all projects at or above the 2500 sats total payment minimum', () => {
      store = createTestStore({
        ...mockProjectDataUsd,
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
      })

      store.set(setFundFormStateAtom, 'donationAmount', 2450)

      expect(store.get(totalAmountSatsAtom)).toBe(2501)
      expect(store.get(isFundingInputAmountValidAtom)).toEqual({ title: '', description: '', valid: true })
    })

    it('keeps the existing $10 minimum for one-time All-or-Nothing projects', () => {
      store = createTestStore({
        ...mockProjectDataUsd,
        fundingStrategy: ProjectFundingStrategy.AllOrNothing,
      })

      store.set(setFundFormStateAtom, 'donationAmount', 1500)

      expect(store.get(isFundingInputAmountValidAtom)).toEqual({
        title: 'Amount less than $10.',
        description: 'The minimum amount for an All-or-Nothing project is $10.',
        valid: false,
      })
    })

    it('keeps the generic 1000 sats minimum for non-Take-it-all projects', () => {
      store = createTestStore({
        ...mockProjectDataUsd,
        fundingStrategy: undefined,
      })

      store.set(setFundFormStateAtom, 'donationAmount', 900)

      expect(store.get(totalAmountSatsAtom)).toBe(919)
      expect(store.get(isFundingInputAmountValidAtom)).toEqual({
        title: 'The payment minimum is 1000 satoshi.',
        description: 'Please update the amount.',
        valid: false,
      })
    })

    it('still applies wallet-specific minimums after the strategy minimum passes', () => {
      const { wallet } = mockProjectDataUsd
      if (!wallet) throw new Error('Expected the USD project mock to include a wallet')

      store = createTestStore({
        ...mockProjectDataUsd,
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        wallet: {
          ...wallet,
          limits: { contribution: { min: 3000, max: 10000000, onChain: { min: 5000, max: 5000000 } } },
        },
      })

      store.set(setFundFormStateAtom, 'donationAmount', 2450)

      expect(store.get(totalAmountSatsAtom)).toBe(2501)
      expect(store.get(isFundingInputAmountValidAtom)).toEqual({
        title: 'The payment minimum is 3000 satoshi.',
        description: 'Please update the amount.',
        valid: false,
      })
    })
  })
})
