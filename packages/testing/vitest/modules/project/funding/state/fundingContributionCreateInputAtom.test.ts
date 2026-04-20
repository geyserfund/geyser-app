import { createStore } from 'jotai'
import { describe, expect, it } from 'vitest'

import { authUserAtom, defaultUser } from '@/modules/auth/state/authAtom.ts'
import { fundingFormStateAtom } from '@/modules/project/funding/state/fundingFormAtom.ts'
import { usdRateAtom } from '@/shared/state/btcRateAtom.ts'
import { referrerHeroIdAtom } from '@/shared/state/referralAtom.ts'
import { ProjectFundingStrategy, RewardCurrency, ShippingDestination, UserSubscriptionInterval } from '@/types'

import {
  fiatOnlyPaymentsInputAtom,
  formattedFundingInputAtom,
} from '../../../../../../../src/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
import { projectAtom, ProjectState } from '../../../../../../../src/modules/project/state/projectAtom.ts'

const createProjectState = (params: {
  fundingStrategy: ProjectFundingStrategy
  stripeEnabled: boolean
  projectName: string
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
    },
    subCategory: null,
    fundingStrategy: params.fundingStrategy,
    rskEoa: null,
  }) as unknown as ProjectState

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
          returnUrl: expect.stringContaining('/project/tia-with-stripe/funding/success'),
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
        interval: UserSubscriptionInterval.Monthly,
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
})
