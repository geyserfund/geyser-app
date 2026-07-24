import { describe, expect, it } from 'vitest'

import { getProjectCreationDescription } from '../../../../../../../../src/modules/project/pages/projectCreation/utils/getProjectCreationDescription.ts'
import { RecoverableGrantFundingOption } from '../../../../../../../../src/modules/project/pages/projectCreation/states/fundingStrategyAtom.ts'
import { ProjectFundingStrategy } from '../../../../../../../../src/types/index.ts'
import { ProjectValidations } from '../../../../../../../../src/shared/constants/validations/project.ts'

describe('getProjectCreationDescription', () => {
  it('returns the complete Recoverable Grant Story template', () => {
    const description = getProjectCreationDescription(RecoverableGrantFundingOption, '')

    expect(description).toContain('[Business name] is a [type of business]')
    expect(description).toContain('## What we offer')
    expect(description).toContain('## Best sellers')
    expect(description).toContain('## Our challenge')
    expect(description).toContain('## How this grant helps')
    expect(description).toContain('## 12-month vision')
    expect(description).toContain('## Returning Funds plan')
    expect(description).toContain('the intended repayment frequency.')
  })

  it.each([ProjectFundingStrategy.TakeItAll, ProjectFundingStrategy.AllOrNothing])(
    'preserves the supplied description for %s projects',
    (fundingOption) => {
      const description = 'Creator-provided project story.'

      expect(getProjectCreationDescription(fundingOption, description)).toBe(description)
    },
  )

  it('returns a template that satisfies Story length validation', () => {
    const description = getProjectCreationDescription(RecoverableGrantFundingOption, '')

    expect(description.length).toBeGreaterThanOrEqual(ProjectValidations.description.minLength)
    expect(description.length).toBeLessThanOrEqual(ProjectValidations.description.maxLength)
  })
})
