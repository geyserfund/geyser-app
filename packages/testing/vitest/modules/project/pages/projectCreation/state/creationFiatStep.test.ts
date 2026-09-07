import { describe, expect, it } from 'vitest'

import { ProjectCreationStep } from '@/types/index.ts'

import { getProjectCreationRoute } from '../../../../../../../../src/modules/project/pages/projectCreation/utils/getProjectCreationRoute.ts'
import { getNextProjectCreationStep } from '../../../../../../../../src/modules/project/pages/projectCreation/utils/projectCreationSteps.ts'

describe('creation fiat step routing', () => {
  it('routes deprecated payment steps back to project details for the deprecation gate', () => {
    expect(getProjectCreationRoute(ProjectCreationStep.IdentityVerification, '123')).toBe('/launch/123/details')
  })

  it('advances from identity verification to launch in the persisted step index', () => {
    // Fiat contributions is a soft UI step (shouldShowCreationFiatStep), not a persisted ProjectCreationStep.
    expect(getNextProjectCreationStep(ProjectCreationStep.IdentityVerification)).toBe(ProjectCreationStep.Launch)
    expect(getNextProjectCreationStep(ProjectCreationStep.Launch)).toBeUndefined()
  })
})
