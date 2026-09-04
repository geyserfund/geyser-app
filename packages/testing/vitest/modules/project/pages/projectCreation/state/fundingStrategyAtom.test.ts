import { describe, expect, it } from 'vitest'

import { canCreateManagedCircularGrant } from '../../../../../../../../src/modules/project/domain/managedCircularGrant.ts'
import {
  getProjectAonGoalDurationInDays,
  CIRCULAR_GRANT_DURATION_IN_DAYS,
  shouldShowAllOrNothingGoalInCreation,
} from '../../../../../../../../src/modules/project/pages/projectCreation/states/fundingStrategyAtom.ts'
import { ProjectFundingStrategy } from '../../../../../../../../src/types/index.ts'

describe('canCreateManagedCircularGrant', () => {
  it('allows Field Partners', () => {
    expect(canCreateManagedCircularGrant(true)).toBe(true)
  })

  it('does not expose managed Circular Grants to other creators', () => {
    expect(canCreateManagedCircularGrant(false)).toBe(false)
  })
})

describe('shouldShowAllOrNothingGoalInCreation', () => {
  it('shows AON goal UI for legacy AON projects', () => {
    expect(
      shouldShowAllOrNothingGoalInCreation({
        fundingStrategy: ProjectFundingStrategy.AllOrNothing,
        isCircularGrant: false,
      }),
    ).toBe(true)
  })

  it('shows the managed Open Funding goal while project data is loading', () => {
    expect(
      shouldShowAllOrNothingGoalInCreation({
        fundingStrategy: undefined,
        isCircularGrant: undefined,
      }),
    ).toBe(false)
  })

  it('shows open funding UI for take-it-all projects even if atom is stale', () => {
    expect(
      shouldShowAllOrNothingGoalInCreation({
        fundingStrategy: ProjectFundingStrategy.TakeItAll,
        isCircularGrant: false,
      }),
    ).toBe(false)
  })
})

describe('getProjectAonGoalDurationInDays', () => {
  it('uses the fixed 14-day duration for Circular Grants', () => {
    expect(getProjectAonGoalDurationInDays(true, 30)).toBe(CIRCULAR_GRANT_DURATION_IN_DAYS)
  })

  it('preserves the selected duration for other All-or-Nothing projects', () => {
    expect(getProjectAonGoalDurationInDays(false, 30)).toBe(30)
  })
})
