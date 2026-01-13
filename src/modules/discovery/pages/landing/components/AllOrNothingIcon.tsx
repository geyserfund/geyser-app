import { LiveDot } from '@/shared/components/feedback/LiveDot.tsx'
import { getIsAonActive } from '@/shared/utils/hooks/useProjectToolKit.ts'
import { ProjectForLandingPageFragment } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

export const AllOrNothingIcon = ({
  project,
}: {
  project: Pick<ProjectForLandingPageFragment, 'fundingStrategy' | 'aonGoal'>
}) => {
  const isAonActive = getIsAonActive(project)

  if (!isAllOrNothing(project)) {
    return null
  }

  if (!isAonActive) {
    return null
  }

  return <LiveDot />
}
