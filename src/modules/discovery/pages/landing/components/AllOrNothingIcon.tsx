import { DateTime } from 'luxon'

import { LiveDot } from '@/shared/components/feedback/LiveDot.tsx'
import { ProjectAonGoalStatus, ProjectForLandingPageFragment } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

export const AllOrNothingIcon = ({
  project,
}: {
  project: Pick<ProjectForLandingPageFragment, 'fundingStrategy' | 'aonGoal'>
}) => {
  if (!isAllOrNothing(project)) {
    return null
  }

  const isActive =
    project.aonGoal?.status === ProjectAonGoalStatus.Active ||
    (project.aonGoal?.status === ProjectAonGoalStatus.Successful && project.aonGoal.endsAt > DateTime.now().toMillis())

  if (!isActive) {
    return null
  }

  return <LiveDot />
}
