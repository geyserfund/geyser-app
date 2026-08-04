import { describe, expect, it } from 'vitest'

import { getPath } from '@/shared/constants/index.ts'
import { ProjectCreationStep, ProjectFundingStrategy } from '@/types/index.ts'

import { getProjectCreationRoute } from '../../../../../../../../src/modules/project/pages/projectCreation/utils/getProjectCreationRoute.ts'
import { shouldShowCreationFiatStep } from '../../../../../../../../src/modules/project/utils/stripeConnect.ts'
import { getNextProjectCreationStep } from '../../../../../../../../src/modules/project/pages/projectCreation/utils/projectCreationSteps.ts'

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
  it('resolves identity verification to the account password route', () => {
    expect(getProjectCreationRoute(ProjectCreationStep.IdentityVerification, '123')).toBe(
      getPath('launchPaymentAccountPassword', '123'),
    )
  })

  it('keeps the fiat contributions path available for in-flow navigation', () => {
    expect(getPath('launchPaymentFiatContributions', '123')).toBe('/launch/123/payment/fiat-contributions')
  })

  it('advances from identity verification to launch in the persisted step index', () => {
    // Fiat contributions is a soft UI step (shouldShowCreationFiatStep), not a persisted ProjectCreationStep.
    expect(getNextProjectCreationStep(ProjectCreationStep.IdentityVerification)).toBe(ProjectCreationStep.Launch)
    expect(getNextProjectCreationStep(ProjectCreationStep.Launch)).toBeUndefined()
  })
})
