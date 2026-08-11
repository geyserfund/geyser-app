import { createStore } from 'jotai'
import { describe, expect, it } from 'vitest'

import { authUserAtom, defaultUser } from '@/modules/auth/state/authAtom.ts'
import { fundingFormStateAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'
import { ProjectFundingStrategy, RewardCurrency, ShippingDestination } from '@/types'

import {
  fiatOnlyPaymentsInputAtom,
  formattedFundingInputAtom,
} from '../../../../../../../src/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { projectAtom, ProjectState } from '../../../../../../../src/modules/project/state/projectAtom.ts'

const createProjectState = (params: {
  fundingStrategy: ProjectFundingStrategy
  stripeEnabled: boolean
  projectName: string
  isRecoverableGrant?: boolean
  managedStripeReady?: boolean
}): ProjectState =>
  ({
    id: 1,
    name: params.projectName,
    title: 'Test Project',
    status: 'active',
    rewardCurrency: RewardCurrency.Usdcent,
    owners: [],
    paymentMethods: {
      fiat: {
        enabled: true,
        stripe: params.stripeEnabled,
      },
      managedRecoverableGrant: {
        stripe: params.managedStripeReady ?? false,
        strikeLightning: false,
        strikeOnChain: false,
      },
    },
    subCategory: null,
    fundingStrategy: params.fundingStrategy,
    isRecoverableGrant: params.isRecoverableGrant ?? false,
    rskEoa: null,
  } as unknown as ProjectState)

describe('fiatOnlyPaymentsInputAtom', () => {
  it('returns stripe fiat payload for TIA projects with stripe enabled', () => {
    const store = createStore()
    store.set(
      projectAtom,
      createProjectState({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        stripeEnabled: true,
        projectName: 'tia-with-stripe',
      }),
    )

    const paymentsInput = store.get(fiatOnlyPaymentsInputAtom)

    expect(paymentsInput).toEqual({
      fiat: {
        create: true,
        stripe: {
          returnUrl: expect.stringContaining('/project/tia-with-stripe/funding/awaiting-success'),
        },
      },
    })
  })

  it('returns empty payments input for TIA projects without stripe', () => {
    const store = createStore()
    store.set(
      projectAtom,
      createProjectState({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        stripeEnabled: false,
        projectName: 'tia-without-stripe',
      }),
    )

    const paymentsInput = store.get(fiatOnlyPaymentsInputAtom)

    expect(paymentsInput).toEqual({})
  })

  it('returns empty payments input for AON projects', () => {
    const store = createStore()
    store.set(
      projectAtom,
      createProjectState({
        fundingStrategy: ProjectFundingStrategy.AllOrNothing,
        stripeEnabled: true,
        projectName: 'aon-with-stripe',
      }),
    )

    const paymentsInput = store.get(fiatOnlyPaymentsInputAtom)

    expect(paymentsInput).toEqual({})
  })

  it('uses managed Stripe readiness instead of creator Stripe configuration', () => {
    const store = createStore()
    store.set(
      projectAtom,
      createProjectState({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        stripeEnabled: false,
        managedStripeReady: true,
        isRecoverableGrant: true,
        projectName: 'managed-grant',
      }),
    )

    expect(store.get(fiatOnlyPaymentsInputAtom)).toEqual({
      fiat: {
        create: true,
        stripe: {
          returnUrl: expect.stringContaining('/project/managed-grant/funding/awaiting-success'),
        },
      },
    })
  })

  it('omits self referrer hero ids from the contribution input', () => {
    const store = createStore()
    store.set(
      projectAtom,
      createProjectState({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        stripeEnabled: true,
        projectName: 'self-referral-check',
      }),
    )
    store.set(usdRateAtom, 100_000)
    store.set(fundingFormStateAtom, {
      donationAmount: 1_000,
      donationAmountUsdCent: 100,
      shippingCost: 0,
      email: '',
      media: '',
      comment: '',
      privateComment: '',
      rewardsByIDAndCount: undefined,
      rewardCurrency: RewardCurrency.Usdcent,
      needsShipping: false,
      shippingDestination: ShippingDestination.National,
      followProject: false,
      subscribeToGeyserEmails: false,
      subscription: {
        cost: 0,
        subscriptionId: undefined,
        currency: undefined,
        interval: 'MONTHLY',
        name: '',
      },
      geyserTipPercent: 5,
      guardianBadges: [],
    })
    store.set(authUserAtom, {
      ...defaultUser,
      id: 123,
      heroId: 'self-hero',
      username: 'self-user',
    })
    store.set(referrerHeroIdAtom, 'self-hero')

    const contributionInput = store.get(formattedFundingInputAtom)

    expect(contributionInput.referrerHeroId).toBeUndefined()
  })

  it('preserves referrer attribution for managed Recoverable Grants', () => {
    const store = createStore()
    store.set(
      projectAtom,
      createProjectState({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        stripeEnabled: false,
        managedStripeReady: true,
        isRecoverableGrant: true,
        projectName: 'managed-grant-referral',
      }),
    )
    store.set(usdRateAtom, 100_000)
    store.set(referrerHeroIdAtom, 'ambassador-hero')
    store.set(fundingFormStateAtom, {
      donationAmount: 1_000,
      donationAmountUsdCent: 100,
      shippingCost: 0,
      email: '',
      media: '',
      comment: '',
      privateComment: '',
      rewardsByIDAndCount: undefined,
      rewardCurrency: RewardCurrency.Usdcent,
      needsShipping: false,
      shippingDestination: ShippingDestination.National,
      followProject: false,
      subscribeToGeyserEmails: false,
      subscription: {
        cost: 0,
        subscriptionId: undefined,
        currency: undefined,
        interval: 'MONTHLY',
        name: '',
      },
      geyserTipPercent: 5,
      guardianBadges: [],
    })

    expect(store.get(formattedFundingInputAtom).referrerHeroId).toBe('ambassador-hero')
  })

  it('includes swap payment inputs when logged out with no account keys', () => {
    const store = createStore()
    store.set(
      projectAtom,
      createProjectState({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        stripeEnabled: false,
        projectName: 'logged-out-swap',
      }),
    )
    store.set(usdRateAtom, 100_000)
    store.set(authUserAtom, null as any)
    store.set(fundingFormStateAtom, {
      donationAmount: 1_000,
      donationAmountUsdCent: 100,
      shippingCost: 0,
      email: '',
      media: '',
      comment: '',
      privateComment: '',
      rewardsByIDAndCount: undefined,
      rewardCurrency: RewardCurrency.Usdcent,
      needsShipping: false,
      shippingDestination: ShippingDestination.National,
      followProject: false,
      subscribeToGeyserEmails: false,
      subscription: {
        cost: 0,
        subscriptionId: undefined,
        currency: undefined,
        interval: 'MONTHLY',
        name: '',
      },
      geyserTipPercent: 5,
      guardianBadges: [],
    } as any)

    const contributionInput = store.get(formattedFundingInputAtom)

    expect(contributionInput.paymentsInput?.lightningToRskSwap?.create).toBe(true)
    expect(contributionInput.paymentsInput?.onChainToRskSwap?.create).toBe(true)
    expect(contributionInput.paymentsInput?.lightningToRskSwap).not.toBe(
      contributionInput.paymentsInput?.onChainToRskSwap,
    )
  })
})
