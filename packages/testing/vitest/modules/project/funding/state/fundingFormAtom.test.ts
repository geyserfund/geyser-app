import { createStore } from 'jotai'
import { beforeEach, describe, expect, it } from 'vitest'

import { shippingCountryAtom } from '@/modules/project/funding/state/shippingAddressAtom.ts'
import { SATOSHIS_IN_BTC } from '@/shared/constants' // Import constant
import { usdRateAtom } from '@/shared/state/btcRateAtom' // Correct import for usdRateAtom
// Import types needed here
import { RewardCurrency, UserSubscriptionInterval } from '@/types'
import { dollarsToCents } from '@/utils/index.ts'

// Import atoms under test
import {
  fundingFormStateAtom,
  FundingProjectState,
  rewardsCostAtoms,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  shippingCostAtom,
  subscriptionCostAtoms,
  tipAtoms,
  totalAmountSatsAtom,
  totalAmountUsdCentAtom,
  updateFundingFormRewardAtom,
  updateFundingFormSubscriptionAtom,
} from '../../../../../../../src/modules/project/funding/state/fundingFormAtom.ts'
// Import dependent source atoms
import { projectAtom, ProjectState } from '../../../../../../../src/modules/project/state/projectAtom.ts'
import { rewardsAtom } from '../../../../../../../src/modules/project/state/rewardsAtom.ts'
import { subscriptionsAtom } from '../../../../../../../src/modules/project/state/subscriptionAtom.ts'
import { walletAtom } from '../../../../../../../src/modules/project/state/walletAtom.ts'
// Import mocks from the new file
import {
  initialTestState,
  mockBitcoinQuote,
  mockProjectDataSats,
  mockProjectDataUsd,
  mockRewardsFull,
  mockUsdRate,
} from './fundingFormAtom.mock.ts'
// Import test helpers
import {
  calculateExpectedRewardCosts,
  calculateExpectedShippingCost,
  calculateExpectedTip,
  calculateExpectedTotalSats,
  calculateExpectedTotalUsdCent,
} from './fundingFormAtom.test.helpers.ts'

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

  // Use describe.each or separate describe blocks for different project currencies
  describe('Project with Usdcent Rewards', () => {
    beforeEach(() => {
      store = createTestStore(mockProjectDataUsd) // Use USD project mock
    })

    it('updateFundingFormRewardAtom should add a single USD cent reward', () => {
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      // Use helpers for expected values
      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '101': 1 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(state.needsShipping).toBe(false)
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('updateFundingFormRewardAtom should add multiple units of a USD cent reward', () => {
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 3 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '101': 3 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '101': 3 })
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('should calculate cost correctly for reward with string ID', () => {
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '101': 1 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(state.needsShipping).toBe(false)
      expect(derivedCosts.sats).toBeGreaterThan(0)
      expect(derivedCosts.usdCents).toBeGreaterThan(0)
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult.sats).toBeGreaterThan(0)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBeGreaterThan(0)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBeGreaterThan(0)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('updateFundingFormRewardAtom should add a reward requiring shipping', () => {
      store.set(updateFundingFormRewardAtom, { id: 103, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '103': 1 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '103': 1 })
      expect(state.needsShipping).toBe(true)
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('updateFundingFormRewardAtom should add multiple different rewards', () => {
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: 103, count: 2 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const selectedRewards = { '101': 1, '103': 2 }
      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: selectedRewards,
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual(selectedRewards)
      expect(state.needsShipping).toBe(true)
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('updateFundingFormRewardAtom should remove a reward', () => {
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: 103, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 0 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const selectedRewards = { '103': 1 }
      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: selectedRewards,
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual(selectedRewards)
      expect(state.needsShipping).toBe(true)
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('updateFundingFormRewardAtom should recalculate derived totals correctly when donation exists', () => {
      const initialDonationSats = 10000
      const initialDonationUsdCent = calculateExpectedTotalUsdCent(initialDonationSats, mockBitcoinQuote)
      store.set(setFundFormStateAtom, 'donationAmount', initialDonationSats)
      store.set(setFundFormStateAtom, 'donationAmountUsdCent', initialDonationUsdCent) // Ensure consistency

      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      const finalState = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tipResult = store.get(tipAtoms)
      const finalTotalSats = store.get(totalAmountSatsAtom)
      const finalTotalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '101': 1 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: finalState.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: finalState.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: initialDonationSats,
        shippingCostSats: finalState.shippingCost,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(finalState.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(finalState.needsShipping).toBe(false)
      expect(finalState.donationAmount).toBe(initialDonationSats)
      expect(finalState.donationAmountUsdCent).toBe(initialDonationUsdCent)
      expect(finalTotalSats).toBe(expectedTotalSats)
      expect(finalTotalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('updateFundingFormRewardAtom should calculate shipping correctly for global & incremental shipping', () => {
      store.set(updateFundingFormRewardAtom, { id: '104' as any, count: 3 })
      const state = store.get(fundingFormStateAtom)
      const shippingCost = store.get(shippingCostAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '104': 3 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedShippingCost = calculateExpectedShippingCost({
        rewards: mockRewardsFull,
        rewardsByIDAndCount: { '104': 3 },
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        shippingCostSats: expectedShippingCost.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '104': 3 })
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
      expect(shippingCost).toEqual(expectedShippingCost)
    })

    it('updateFundingFormRewardAtom should calculate shipping correctly for a different country code', () => {
      store.set(updateFundingFormRewardAtom, { id: '106' as any, count: 4 })
      store.set(shippingCountryAtom, 'US')

      const state = store.get(fundingFormStateAtom)
      const shippingCost = store.get(shippingCostAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '106': 4 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedShippingCost = calculateExpectedShippingCost({
        rewards: mockRewardsFull,
        rewardsByIDAndCount: { '106': 4 },
        shippingCountry: 'US',
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        shippingCostSats: expectedShippingCost.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '106': 4 })
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
      expect(shippingCost).toEqual(expectedShippingCost)
    })

    it('updateFundingFormRewardAtom should calculate shipping correctly for rewards with multiple shipping configs', () => {
      store.set(updateFundingFormRewardAtom, { id: '104' as any, count: 2 })
      store.set(updateFundingFormRewardAtom, { id: '105' as any, count: 3 })
      store.set(updateFundingFormRewardAtom, { id: '106' as any, count: 4 })

      const state = store.get(fundingFormStateAtom)
      const shippingCost = store.get(shippingCostAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '104': 2, '105': 3, '106': 4 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Usdcent,
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedShippingCost = calculateExpectedShippingCost({
        rewards: mockRewardsFull,
        rewardsByIDAndCount: { '104': 2, '105': 3, '106': 4 },
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        shippingCostSats: expectedShippingCost.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })

      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '104': 2, '105': 3, '106': 4 })
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
      expect(shippingCost).toEqual(expectedShippingCost)
    })
  })

  describe('Project with Btcsat Rewards', () => {
    beforeEach(() => {
      store = createTestStore(mockProjectDataSats)
    })

    it('updateFundingFormRewardAtom should add a single SATS reward', () => {
      store.set(updateFundingFormRewardAtom, { id: 102, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: { '102': 1 },
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Btcsat,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual({ '102': 1 })
      expect(state.needsShipping).toBe(false)
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
    })

    it('updateFundingFormRewardAtom should add multiple different rewards (SATS project)', () => {
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: 102, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const shippingCost = store.get(shippingCostAtom)
      const tipResult = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const selectedRewards = { '101': 1, '102': 1 }
      const expectedCosts = calculateExpectedRewardCosts({
        rewardsByIDAndCount: selectedRewards,
        rewards: mockRewardsFull,
        rewardCurrency: RewardCurrency.Btcsat,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTip = calculateExpectedTip({
        donationAmount: state.donationAmount,
        rewardsCostSatoshi: expectedCosts.sats,
        geyserTipPercent: state.geyserTipPercent,
        bitcoinQuote: mockBitcoinQuote,
      })
      const expectedTotalSats = calculateExpectedTotalSats({
        donationAmount: state.donationAmount,
        shippingCostSats: shippingCost.sats,
        rewardsSats: expectedCosts.sats,
        tipSats: expectedTip.sats,
      })
      const expectedTotalUsdCent = calculateExpectedTotalUsdCent(expectedTotalSats, mockBitcoinQuote)

      expect(state.rewardsByIDAndCount).toEqual(selectedRewards)
      expect(state.needsShipping).toBe(false)
      expect(derivedCosts).toEqual(expectedCosts)
      expect(tipResult).toEqual(expectedTip)
      expect(totalSats).toBe(expectedTotalSats)
      expect(totalUsdCent).toBe(expectedTotalUsdCent)
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
      const expectedSubCostSats = Math.round((expectedSubCostUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      expect(state.subscription.subscriptionId).toBe(201)
      expect(state.subscription.cost).toBe(expectedSubCostUsdCent)
      expect(state.subscription.currency).toBe('USDCENT')
      expect(state.subscription.interval).toBe(UserSubscriptionInterval.Monthly)
      expect(state.subscription.name).toBe('Monthly USD Supporter')
      expect(derivedSubCosts).toEqual({ sats: expectedSubCostSats, usdCents: expectedSubCostUsdCent, base: 500 })
      expect(totalSats).toBe(state.donationAmount + derivedSubCosts.sats + tip.sats)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedSubCosts.usdCents + tip.usdCents)
    })

    it('updateFundingFormSubscriptionAtom should add a SATS subscription', () => {
      store.set(updateFundingFormSubscriptionAtom, { id: 202 })
      const state = store.get(fundingFormStateAtom)
      const derivedSubCosts = store.get(subscriptionCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedSubCostSats = 100000

      expect(state.subscription.subscriptionId).toBe(202)
      expect(state.subscription.cost).toBe(expectedSubCostSats)
      expect(state.subscription.currency).toBe('BTCSAT')
      expect(state.subscription.interval).toBe(UserSubscriptionInterval.Yearly)
      expect(state.subscription.name).toBe('Annual SATS Backer')
      expect(derivedSubCosts).toEqual({ sats: 0, usdCents: 0, base: 100000 })
      expect(totalSats).toBe(state.donationAmount + tip.sats)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + tip.usdCents)
    })

    it('updateFundingFormSubscriptionAtom should overwrite previous subscription', () => {
      store.set(updateFundingFormSubscriptionAtom, { id: 201 })
      store.set(updateFundingFormSubscriptionAtom, { id: 202 })
      const state = store.get(fundingFormStateAtom)
      const derivedSubCosts = store.get(subscriptionCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedSubCostSats = 100000

      expect(state.subscription.subscriptionId).toBe(202)
      expect(state.subscription.cost).toBe(expectedSubCostSats)
      expect(state.subscription.currency).toBe('BTCSAT')
      expect(derivedSubCosts).toEqual({ sats: 0, usdCents: 0, base: 100000 })
      expect(totalSats).toBe(state.donationAmount + tip.sats)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + tip.usdCents)
    })

    it('updateFundingFormSubscriptionAtom totals reflect subscription cost over reward cost', () => {
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      const stateWithReward = store.get(fundingFormStateAtom)
      const rewardCosts = store.get(rewardsCostAtoms)
      const tipWithReward = store.get(tipAtoms)
      const totalSatsWithReward = store.get(totalAmountSatsAtom)
      expect(totalSatsWithReward).toBe(stateWithReward.donationAmount + rewardCosts.sats + tipWithReward.sats)

      store.set(updateFundingFormSubscriptionAtom, { id: 201 })
      const stateWithSub = store.get(fundingFormStateAtom)
      const subCosts = store.get(subscriptionCostAtoms)
      const tipAfterSub = store.get(tipAtoms)
      const totalSatsWithSub = store.get(totalAmountSatsAtom)
      const totalUsdCentWithSub = store.get(totalAmountUsdCentAtom)
      const derivedRewardCostsAfterSub = store.get(rewardsCostAtoms)

      expect(tipAfterSub).toEqual(tipWithReward)
      const expectedTotalSats = 0 + rewardCosts.sats + subCosts.sats + tipAfterSub.sats
      expect(totalSatsWithSub).toBe(expectedTotalSats)
      expect(totalSatsWithSub).not.toBe(totalSatsWithReward)
      const expectedTipUsdCent = Math.round(dollarsToCents((tipAfterSub.sats / SATOSHIS_IN_BTC) * mockUsdRate))
      const expectedTotalUsdCent = 0 + rewardCosts.usdCents + subCosts.usdCents + expectedTipUsdCent
      expect(totalUsdCentWithSub).toBe(expectedTotalUsdCent)

      expect(stateWithSub.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(derivedRewardCostsAfterSub.sats).toBe(rewardCosts.sats)
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
})
