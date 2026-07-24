import { describe, expect, it } from 'vitest'

import {
  getProjectAonGoalDurationInDays,
  RECOVERABLE_GRANT_DURATION_IN_DAYS,
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

describe('getProjectAonGoalDurationInDays', () => {
  it('uses the fixed 14-day duration for Recoverable Grants', () => {
    expect(getProjectAonGoalDurationInDays(true, 30)).toBe(RECOVERABLE_GRANT_DURATION_IN_DAYS)
  })

  it('preserves the selected duration for other All-or-Nothing projects', () => {
    expect(getProjectAonGoalDurationInDays(false, 30)).toBe(30)
  })
})
