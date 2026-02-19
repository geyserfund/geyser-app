import { createStore } from 'jotai'
import { describe, expect, it } from 'vitest'

import { ProjectFundingStrategy, RewardCurrency } from '@/types'

import { fiatOnlyPaymentsInputAtom } from '../../../../../../../src/modules/project/funding/state/fundingContributionCreateInputAtom.ts'
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
})
