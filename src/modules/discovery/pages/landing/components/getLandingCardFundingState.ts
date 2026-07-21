import { aonProjectTimeLeft } from '@/shared/utils/project/getAonData.ts'
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
  const timeLeft = aonProjectTimeLeft({
    endsAt: fundingSummary.endsAt,
    deployedAt: null,
    goalDurationInDays: 0,
    status: fundingSummary.status as ProjectAonGoalStatus,
  })
  const isFailed = isAonProject && fundingSummary.isFundingFailed

  return {
    percentage,
    timeLeft,
    isFailed,
    isEndedFunded: isAonProject && !isFailed && !timeLeft && percentage >= 100,
  }
}
