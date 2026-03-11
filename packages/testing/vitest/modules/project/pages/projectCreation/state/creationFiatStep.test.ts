import { describe, expect, it } from 'vitest'

import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'

import { getProjectCreationRoute } from '../../../../../../../../src/modules/project/pages/projectCreation/utils/getProjectCreationRoute.ts'
import { getNextProjectCreationStep } from '../../../../../../../../src/modules/project/pages/projectCreation/utils/projectCreationSteps.ts'
import { shouldShowCreationFiatStep } from '../../../../../../../../src/modules/project/pages/projectCreation/views/launchPayment/utils/stripeConnect.ts'

describe('creation fiat step eligibility', () => {
  it('shows the fiat step for take-it-all projects in supported countries', () => {
    expect(
      shouldShowCreationFiatStep({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        location: { country: { code: 'US' } },
      }),
    ).toBe(true)
  })

  it('hides the fiat step for unsupported countries', () => {
    expect(
      shouldShowCreationFiatStep({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        location: { country: { code: 'BR' } },
      }),
    ).toBe(false)
  })

  it('hides the fiat step for all-or-nothing projects', () => {
    expect(
      shouldShowCreationFiatStep({
        fundingStrategy: ProjectFundingStrategy.AllOrNothing,
        location: { country: { code: 'US' } },
      }),
    ).toBe(false)
  })

  it('hides the fiat step when the project has no country', () => {
    expect(
      shouldShowCreationFiatStep({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        location: { country: null },
      }),
    ).toBe(false)
  })
})

describe('creation fiat step routing', () => {
  it('resolves the persisted fiat contributions step to the new route', () => {
    expect(getProjectCreationRoute(ProjectCreationStep.FiatContributions, '123')).toBe(
      getPath('launchPaymentFiatContributions', '123'),
    )
  })

  it('advances from identity verification to fiat contributions to launch', () => {
    expect(getNextProjectCreationStep(ProjectCreationStep.IdentityVerification)).toBe(
      ProjectCreationStep.FiatContributions,
    )
    expect(getNextProjectCreationStep(ProjectCreationStep.FiatContributions)).toBe(ProjectCreationStep.Launch)
  })
})
