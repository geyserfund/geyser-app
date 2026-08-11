import { DateTime } from 'luxon'

import { getTimeLeft } from '@/shared/utils/project/getAonData.ts'
import type { ProjectFundingSummary } from '@/types/generated/graphql.ts'
import { ProjectAonGoalStatus } from '@/types/generated/graphql.ts'

/** Derives the funding state displayed by a landing project card. */
export const getLandingCardFundingState = ({
  fundingSummary,
  isAonProject,
}: {
  fundingSummary: Pick<ProjectFundingSummary, 'endsAt' | 'isFundingFailed' | 'percentageFunded' | 'status'>
  isAonProject: boolean
}) => {
  const percentage = fundingSummary.percentageFunded ?? 0
  const endsAt = fundingSummary.endsAt ? DateTime.fromMillis(Number(fundingSummary.endsAt)) : null
  const timeLeft =
    !endsAt || (isAonProject && fundingSummary.status === ProjectAonGoalStatus.Claimed)
      ? null
      : getTimeLeft(isAonProject ? endsAt.minus({ minutes: 10 }) : endsAt)
  const isFailed = isAonProject && fundingSummary.isFundingFailed

  return {
    percentage,
    timeLeft,
    isFailed,
    isEndedFunded: isAonProject && !isFailed && !timeLeft && percentage >= 100,
  }
}
