import { LiveDot } from '@/shared/components/feedback/LiveDot.tsx'
import { ProjectForLandingPageFragment, ProjectFundingStrategy } from '@/types/index.ts'

export const AllOrNothingIcon = ({ project }: { project: Pick<ProjectForLandingPageFragment, 'fundingSummary'> }) => {
  if (project.fundingSummary.fundingStrategy !== ProjectFundingStrategy.AllOrNothing) {
    return null
  }

  if (!project.fundingSummary.isFundingOpen) {
    return null
  }

  return <LiveDot />
}
