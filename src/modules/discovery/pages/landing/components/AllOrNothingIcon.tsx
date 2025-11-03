import { LiveDot } from '@/shared/components/feedback/LiveDot.tsx'
import { Project } from '@/types/index.ts'
import { isAllOrNothing } from '@/utils/index.ts'

export const AllOrNothingIcon = ({ project }: { project: Pick<Project, 'fundingStrategy'> }) => {
  if (!isAllOrNothing(project)) {
    return null
  }

  return <LiveDot />
}
