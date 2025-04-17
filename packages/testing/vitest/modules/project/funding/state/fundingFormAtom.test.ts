import { createStore } from 'jotai'
import { beforeEach, describe, expect, it } from 'vitest'

import { SATOSHIS_IN_BTC } from '@/shared/constants' // Import constant
import { usdRateAtom } from '@/shared/state/btcRateAtom' // Correct import for usdRateAtom
import {
  // PaymentMethodType, // Removed import
  ProjectRewardFragment, // Import the reward type
  ProjectSubscriptionPlansFragment, // Import subscription type
  RewardCurrency,
  ShippingDestination,
  SubscriptionCurrencyType,
  UserSubscriptionInterval,
  WalletState,
} from '@/types'
import { dollarsToCents } from '@/utils/index.ts'

import {
  FundFormType,
  fundingFormStateAtom,
  FundingProjectState,
  resetFundingFormAtom,
  // Import derived atoms
  rewardsCostAtoms,
  setFundFormStateAtom,
  setFundFormTargetAtom,
  subscriptionCostAtoms,
  tipAtoms,
  totalAmountSatsAtom,
  totalAmountUsdCentAtom,
  updateFundingFormRewardAtom, // Import the atom we are testing
  updateFundingFormSubscriptionAtom, // Import the atom we are testing
} from '../../../../../../../src/modules/project/funding/state/fundingFormAtom.ts' // Adjust path as necessary
// Import source atoms that fundingProjectAtom depends on
import { projectAtom, ProjectState } from '../../../../../../../src/modules/project/state/projectAtom.ts'
import { rewardsAtom } from '../../../../../../../src/modules/project/state/rewardsAtom.ts'
import { subscriptionsAtom } from '../../../../../../../src/modules/project/state/subscriptionAtom.ts'
import { walletAtom } from '../../../../../../../src/modules/project/state/walletAtom.ts'

// --- Mocks ---
const mockUsdRate = 50000

// Define mock rewards
const mockRewardsFull: ProjectRewardFragment[] = [
  {
    id: '101',
    cost: 1000,
    hasShipping: false,
    __typename: 'ProjectReward',
    uuid: 'uuid-101',
    name: 'USD Reward 1 String ID',
    description: 'Desc 101',
    images: [],
    privateCommentPrompts: [],
    stock: null,
    deleted: false,
    sold: 0,
    rewardCurrency: RewardCurrency.Usdcent,
    isAddon: false,
    isHidden: false,
    preOrder: false,
    posts: [],
  },
  {
    id: 102,
    cost: 20000,
    hasShipping: false,
    __typename: 'ProjectReward',
    uuid: 'uuid-102',
    name: 'USD Reward 2 Number ID',
    description: 'Desc 102',
    images: [],
    privateCommentPrompts: [],
    stock: null,
    deleted: false,
    sold: 0,
    rewardCurrency: RewardCurrency.Usdcent,
    isAddon: false,
    isHidden: false,
    preOrder: false,
    posts: [],
  },
  {
    id: 103,
    cost: 500,
    hasShipping: true,
    __typename: 'ProjectReward',
    uuid: 'uuid-103',
    name: 'USD Reward 3 Shipping',
    description: 'Desc 103',
    images: [],
    privateCommentPrompts: [],
    stock: null,
    deleted: false,
    sold: 0,
    rewardCurrency: RewardCurrency.Usdcent,
    isAddon: false,
    isHidden: false,
    preOrder: false,
    posts: [],
  },
]

// Define minimal mock subscriptions for testing calculation logic
const mockSubscriptionsMinimal = [
  {
    id: 201,
    name: 'Monthly USD Supporter',
    cost: 500, // $5.00
    currency: 'USDCENT' as SubscriptionCurrencyType, // Use string literal + cast
    interval: UserSubscriptionInterval.Monthly,
  },
  {
    id: 202,
    name: 'Annual SATS Backer',
    cost: 100000, // 100,000 sats
    currency: 'BTCSAT' as SubscriptionCurrencyType, // Use string literal + cast
    interval: UserSubscriptionInterval.Yearly,
  },
] as ProjectSubscriptionPlansFragment[] // Cast the minimal array

// Mock project data using the minimal subscriptions
const mockProjectDataUsd: FundingProjectState = {
  id: 1,
  name: 'usd-project',
  title: 'USD Project',
  rewardCurrency: RewardCurrency.Usdcent,
  paymentMethods: {
    fiat: { stripe: false, __typename: 'FiatPaymentMethods' },
    __typename: 'PaymentMethods',
  },
  owners: [],
  rewards: mockRewardsFull,
  wallet: {
    id: 'wallet1',
    limits: { contribution: { min: 100, max: 10000000, onChain: { min: 5000, max: 5000000 } } },
    state: 'Ready' as unknown as WalletState,
    __typename: 'Wallet',
  },
  subscriptions: mockSubscriptionsMinimal,
}

// Create a separate mock for a project using SATS rewards
const mockProjectDataSats: FundingProjectState = {
  ...mockProjectDataUsd,
  id: 2,
  name: 'Test Project SATS Rewards',
  rewardCurrency: RewardCurrency.Btcsat, // Project uses SATS for rewards
  rewards: mockRewardsFull,
  subscriptions: mockSubscriptionsMinimal, // Use minimal subscriptions
}

const initialState: FundFormType = {
  donationAmount: 0,
  donationAmountUsdCent: 0,
  // rewardsCost: 0,
  // rewardsCostInSatoshi: 0,
  // rewardsCostInUsdCent: 0,
  shippingCost: 0,
  // totalAmount: 0,
  // totalAmountUsdCent: 0,
  comment: '',
  privateComment: '',
  email: '',
  media: '',
  followProject: true,
  subscribeToGeyserEmails: false,
  rewardsByIDAndCount: undefined,
  subscription: {
    cost: 0,
    subscriptionId: undefined,
    currency: SubscriptionCurrencyType.Usdcent,
    interval: UserSubscriptionInterval.Monthly,
    name: '',
  },
  rewardCurrency: RewardCurrency.Usdcent,
  needsShipping: false,
  shippingDestination: ShippingDestination.National,
  geyserTipPercent: 2.1,
}

// --- Test Setup ---
const createTestStore = (projectData: FundingProjectState = mockProjectDataUsd) => {
  const store = createStore()
  store.set(usdRateAtom, mockUsdRate)
  const { rewards, subscriptions, wallet, ...projData } = projectData
  store.set(projectAtom, projData as ProjectState)
  store.set(walletAtom, wallet)
  store.set(rewardsAtom, rewards)
  // Subscriptions should match type due to array cast
  store.set(subscriptionsAtom, subscriptions ?? [])
  store.set(fundingFormStateAtom, initialState)
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
      store.set(updateFundingFormRewardAtom, { id: 101, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedRewardCostUsdCent = 1000
      const expectedRewardCostSats = Math.round((expectedRewardCostUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      expect(state.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(state.needsShipping).toBe(false)
      expect(derivedCosts).toEqual({ satoshi: expectedRewardCostSats, usdCent: expectedRewardCostUsdCent, base: 1000 })
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
    })

    it('updateFundingFormRewardAtom should add multiple units of a USD cent reward', () => {
      store.set(updateFundingFormRewardAtom, { id: 101, count: 3 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedRewardCostUsdCent = 1000 * 3
      const expectedRewardCostSats = Math.round((expectedRewardCostUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      expect(state.rewardsByIDAndCount).toEqual({ '101': 3 })
      expect(derivedCosts).toEqual({ satoshi: expectedRewardCostSats, usdCent: expectedRewardCostUsdCent, base: 3000 })
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
    })

    it('should calculate cost correctly for reward with string ID', () => {
      // Use the reward with the string ID '101'
      store.set(updateFundingFormRewardAtom, { id: '101' as any, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      // Assertions based on reward '101' (cost: 1000 usdCent)
      const expectedRewardCostUsdCent = 1000
      const expectedRewardCostSats = Math.round((expectedRewardCostUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      // Check state update
      expect(state.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(state.needsShipping).toBe(false)

      // Verify derived costs are calculated correctly (not 0)
      expect(derivedCosts.satoshi).toBeGreaterThan(0)
      expect(derivedCosts.usdCent).toBeGreaterThan(0)
      expect(derivedCosts).toEqual({ satoshi: expectedRewardCostSats, usdCent: expectedRewardCostUsdCent, base: 1000 })

      // Verify tip is calculated based on reward cost
      expect(tip.satoshi).toBeGreaterThan(0)
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))

      // Verify totals include the reward cost and tip
      expect(totalSats).toBeGreaterThan(0)
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBeGreaterThan(0)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
    })

    it('updateFundingFormRewardAtom should add a reward requiring shipping', () => {
      store.set(updateFundingFormRewardAtom, { id: 103, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedRewardCostUsdCent = 500
      const expectedRewardCostSats = Math.round((expectedRewardCostUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      expect(state.rewardsByIDAndCount).toEqual({ '103': 1 })
      expect(state.needsShipping).toBe(true)
      expect(derivedCosts).toEqual({ satoshi: expectedRewardCostSats, usdCent: expectedRewardCostUsdCent, base: 500 })
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
    })

    it('updateFundingFormRewardAtom should add multiple different rewards', () => {
      store.set(updateFundingFormRewardAtom, { id: 101, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: 103, count: 2 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedTotalBaseCost = 1000 + 500 * 2
      const correctTotalRewardCostSats = Math.round((expectedTotalBaseCost / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      expect(state.rewardsByIDAndCount).toEqual({ '101': 1, '103': 2 })
      expect(state.needsShipping).toBe(true)
      expect(derivedCosts).toEqual({ satoshi: correctTotalRewardCostSats, usdCent: expectedTotalBaseCost, base: 2000 })
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
    })

    it('updateFundingFormRewardAtom should remove a reward', () => {
      store.set(updateFundingFormRewardAtom, { id: 101, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: 103, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: 101, count: 0 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const remainingRewardCostUsdCent = 500
      const remainingRewardCostSats = Math.round((remainingRewardCostUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      expect(state.rewardsByIDAndCount).toEqual({ '103': 1 })
      expect(state.needsShipping).toBe(true)
      expect(derivedCosts).toEqual({ satoshi: remainingRewardCostSats, usdCent: remainingRewardCostUsdCent, base: 500 })
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
    })

    it('updateFundingFormRewardAtom should recalculate derived totals correctly when donation exists', () => {
      store.set(setFundFormStateAtom, 'donationAmount', 10000)
      const initialDonationUsdCent = Math.round((10000 / SATOSHIS_IN_BTC) * mockUsdRate * 100)
      store.set(setFundFormStateAtom, 'donationAmountUsdCent', initialDonationUsdCent)
      const initialState = store.get(fundingFormStateAtom)

      store.set(updateFundingFormRewardAtom, { id: 101, count: 1 })
      const finalState = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const finalTotalSats = store.get(totalAmountSatsAtom)
      const finalTotalUsdCent = store.get(totalAmountUsdCentAtom)

      const rewardCostUsdCent = 1000
      const rewardCostSats = Math.round((rewardCostUsdCent / 100 / mockUsdRate) * SATOSHIS_IN_BTC)

      expect(derivedCosts).toEqual({ satoshi: rewardCostSats, usdCent: rewardCostUsdCent, base: 1000 })
      const finalExpectedTipSats = Math.round(
        ((initialState.donationAmount + rewardCostSats) * finalState.geyserTipPercent) / 100,
      )
      const finalExpectedTipUsdCent = Math.round((finalExpectedTipSats / SATOSHIS_IN_BTC) * mockUsdRate * 100)
      expect(tip).toEqual({ satoshi: finalExpectedTipSats, usdCent: finalExpectedTipUsdCent })

      expect(finalState.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(finalState.needsShipping).toBe(false)
      expect(finalState.donationAmount).toBe(initialState.donationAmount)
      expect(finalState.donationAmountUsdCent).toBe(initialState.donationAmountUsdCent)

      expect(finalTotalSats).toBe(initialState.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(finalTotalUsdCent).toBe(initialState.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
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
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const expectedRewardCostSats = 20000
      const expectedRewardCostUsdCent = Math.round((expectedRewardCostSats / SATOSHIS_IN_BTC) * mockUsdRate * 100)

      expect(state.rewardsByIDAndCount).toEqual({ '102': 1 })
      expect(state.needsShipping).toBe(false)
      expect(derivedCosts).toEqual({ satoshi: expectedRewardCostSats, usdCent: expectedRewardCostUsdCent, base: 20000 })
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
    })

    it('updateFundingFormRewardAtom should add multiple different rewards (SATS project)', () => {
      store.set(updateFundingFormRewardAtom, { id: 101, count: 1 })
      store.set(updateFundingFormRewardAtom, { id: 102, count: 1 })
      const state = store.get(fundingFormStateAtom)
      const derivedCosts = store.get(rewardsCostAtoms)
      const tip = store.get(tipAtoms)
      const totalSats = store.get(totalAmountSatsAtom)
      const totalUsdCent = store.get(totalAmountUsdCentAtom)

      const correctTotalRewardCostSats = 1000 + 20000 // 21000
      const expectedTotalRewardCostUsdCent = Math.round(
        (correctTotalRewardCostSats / SATOSHIS_IN_BTC) * mockUsdRate * 100,
      )

      expect(state.rewardsByIDAndCount).toEqual({ '101': 1, '102': 1 })
      expect(state.needsShipping).toBe(false)
      expect(derivedCosts).toEqual({
        satoshi: correctTotalRewardCostSats,
        usdCent: expectedTotalRewardCostUsdCent,
        base: 21000,
      })
      expect(tip.satoshi).toBe(Math.round((derivedCosts.satoshi * state.geyserTipPercent) / 100))
      expect(totalSats).toBe(state.donationAmount + derivedCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedCosts.usdCent + tip.usdCent)
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
      expect(derivedSubCosts).toEqual({ satoshi: expectedSubCostSats, usdCent: expectedSubCostUsdCent, base: 500 })
      expect(totalSats).toBe(state.donationAmount + derivedSubCosts.satoshi + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + derivedSubCosts.usdCent + tip.usdCent)
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
      expect(derivedSubCosts).toEqual({ satoshi: 0, usdCent: 0, base: 100000 })
      expect(totalSats).toBe(state.donationAmount + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + tip.usdCent)
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
      expect(derivedSubCosts).toEqual({ satoshi: 0, usdCent: 0, base: 100000 })
      expect(totalSats).toBe(state.donationAmount + tip.satoshi)
      expect(totalUsdCent).toBe(state.donationAmountUsdCent + tip.usdCent)
    })

    it('updateFundingFormSubscriptionAtom totals reflect subscription cost over reward cost', () => {
      store.set(updateFundingFormRewardAtom, { id: 101, count: 1 })
      const stateWithReward = store.get(fundingFormStateAtom)
      const rewardCosts = store.get(rewardsCostAtoms)
      const tipWithReward = store.get(tipAtoms)
      const totalSatsWithReward = store.get(totalAmountSatsAtom)
      expect(totalSatsWithReward).toBe(stateWithReward.donationAmount + rewardCosts.satoshi + tipWithReward.satoshi)

      store.set(updateFundingFormSubscriptionAtom, { id: 201 })
      const stateWithSub = store.get(fundingFormStateAtom)
      const subCosts = store.get(subscriptionCostAtoms)
      const tipAfterSub = store.get(tipAtoms)
      const totalSatsWithSub = store.get(totalAmountSatsAtom)
      const totalUsdCentWithSub = store.get(totalAmountUsdCentAtom)
      const derivedRewardCostsAfterSub = store.get(rewardsCostAtoms)

      expect(tipAfterSub).toEqual(tipWithReward)
      const expectedTotalSats = 0 + rewardCosts.satoshi + subCosts.satoshi + tipAfterSub.satoshi
      expect(totalSatsWithSub).toBe(expectedTotalSats)
      expect(totalSatsWithSub).not.toBe(totalSatsWithReward)
      const expectedTipUsdCent = Math.round(dollarsToCents((tipAfterSub.satoshi / SATOSHIS_IN_BTC) * mockUsdRate))
      const expectedTotalUsdCent = 0 + rewardCosts.usdCent + subCosts.usdCent + expectedTipUsdCent
      expect(totalUsdCentWithSub).toBe(expectedTotalUsdCent)

      expect(stateWithSub.rewardsByIDAndCount).toEqual({ '101': 1 })
      expect(derivedRewardCostsAfterSub.satoshi).toBe(rewardCosts.satoshi)
    })
  })

  // Shared tests or tests not dependent on project currency can go here
  beforeEach(() => {
    // Reset store with default USD project before each top-level test
    store = createTestStore(mockProjectDataUsd)
  })

  it('should initialize with the correct default state', () => {
    const state = store.get(fundingFormStateAtom)
    expect(state).toEqual(initialState)
    // Check initial derived values
    expect(store.get(rewardsCostAtoms)).toEqual({ satoshi: 0, usdCent: 0, base: 0 })
    expect(store.get(subscriptionCostAtoms)).toEqual({ satoshi: 0, usdCent: 0, base: 0 })
    expect(store.get(tipAtoms)).toEqual({ satoshi: 0, usdCent: 0 })
    expect(store.get(totalAmountSatsAtom)).toBe(0)
    expect(store.get(totalAmountUsdCentAtom)).toBe(0)
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
    expect(store.get(tipAtoms)).toEqual({ satoshi: expectedTipSats, usdCent: expectedTipUsdCent })
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
    expect(store.get(tipAtoms)).toEqual({ satoshi: expectedTipSats, usdCent: expectedTipUsdCent })
    expect(store.get(totalAmountSatsAtom)).toBe(10000 + expectedTipSats)
    expect(store.get(totalAmountUsdCentAtom)).toBe(expectedDonationUsdCent + expectedTipUsdCent)
  })

  it('resetFundingFormAtom should reset the state to initial values', () => {
    // Set some values different from initial
    store.set(setFundFormStateAtom, 'donationAmount', 5000)
    store.set(setFundFormStateAtom, 'email', 'test@example.com')
    store.set(updateFundingFormRewardAtom, { id: 101, count: 1 })
    let state = store.get(fundingFormStateAtom)
    expect(state.donationAmount).toBe(5000)
    expect(state.email).toBe('test@example.com')
    expect(state.rewardsByIDAndCount).toEqual({ '101': 1 })

    // Reset the state
    store.set(resetFundingFormAtom)

    // Verify reset fields are back to initial values
    state = store.get(fundingFormStateAtom)
    expect(state.rewardsByIDAndCount).toBeUndefined() // Check reset value
    expect(state.needsShipping).toBe(false) // Check reset value
    expect(state.email).toBe('') // Check reset value
    expect(state.donationAmount).toBe(0) // Check reset value
    expect(state.donationAmountUsdCent).toBe(0) // Check reset value
    expect(state.geyserTipPercent).toBe(2.1) // Check reset value

    // Derived atoms should reflect the reset state (e.g., 0 costs, 0 totals)
    expect(store.get(rewardsCostAtoms)).toEqual({ satoshi: 0, usdCent: 0, base: 0 })
    expect(store.get(subscriptionCostAtoms)).toEqual({ satoshi: 0, usdCent: 0, base: 0 })
    expect(store.get(tipAtoms)).toEqual({ satoshi: 0, usdCent: 0 })
    expect(store.get(totalAmountSatsAtom)).toBe(0)
    expect(store.get(totalAmountUsdCentAtom)).toBe(0)
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
    expect(store.get(tipAtoms)).toEqual({ satoshi: expectedTipSats, usdCent: expectedTipUsdCent })
    expect(store.get(totalAmountSatsAtom)).toBe(expectedSats + expectedTipSats)
    expect(store.get(totalAmountUsdCentAtom)).toBe(newDonationUsdCent + expectedTipUsdCent)
  })
})
