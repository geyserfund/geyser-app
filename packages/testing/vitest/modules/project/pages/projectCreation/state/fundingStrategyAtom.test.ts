import { describe, expect, it } from 'vitest'

import {
  RecoverableGrantFundingOption,
  shouldShowAllOrNothingGoalInCreation,
} from '../../../../../../../../src/modules/project/pages/projectCreation/states/fundingStrategyAtom.ts'
import { ProjectFundingStrategy } from '../../../../../../../../src/types/index.ts'

describe('shouldShowAllOrNothingGoalInCreation', () => {
  it('shows AON goal UI for recoverable grant projects', () => {
    expect(
      shouldShowAllOrNothingGoalInCreation(
        {
          fundingStrategy: ProjectFundingStrategy.AllOrNothing,
          isRecoverableGrant: true,
        },
        ProjectFundingStrategy.TakeItAll,
      ),
    ).toBe(true)
  })

  it('shows AON goal UI while project data is loading after selecting recoverable grant', () => {
    expect(
      shouldShowAllOrNothingGoalInCreation(
        {
          fundingStrategy: undefined,
          isRecoverableGrant: undefined,
        },
        RecoverableGrantFundingOption,
      ),
    ).toBe(true)
  })

  it('shows open funding UI for take-it-all projects even if atom is stale', () => {
    expect(
      shouldShowAllOrNothingGoalInCreation(
        {
          fundingStrategy: ProjectFundingStrategy.TakeItAll,
          isRecoverableGrant: false,
        },
        RecoverableGrantFundingOption,
      ),
    ).toBe(false)
  })
})
