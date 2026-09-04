import { describe, expect, it } from 'vitest'

import { ProjectAonGoalStatus } from '@/types'

import { getLandingCardFundingState } from '../../../../../../src/modules/discovery/pages/landing/components/getLandingCardFundingState.ts'

describe('getLandingCardFundingState', () => {
  it('shows managed Circular Grant progress against its summary deadline without AON status handling', () => {
    const state = getLandingCardFundingState({
      fundingSummary: {
        endsAt: Date.now() + 24 * 60 * 60 * 1000,
        percentageFunded: 50,
        isFundingFailed: false,
        status: ProjectAonGoalStatus.Active,
      },
      isAonProject: false,
    })

    expect(state).toMatchObject({ percentage: 50, isFailed: false, isEndedFunded: false })
    expect(state.timeLeft).not.toBeNull()
  })

  it('keeps expired managed Circular Grants out of AON failed and claim states', () => {
    const state = getLandingCardFundingState({
      fundingSummary: {
        endsAt: Date.now() - 1,
        percentageFunded: 50,
        isFundingFailed: false,
        status: ProjectAonGoalStatus.Active,
      },
      isAonProject: false,
    })

    expect(state).toMatchObject({ percentage: 50, timeLeft: null, isFailed: false, isEndedFunded: false })
  })
})
