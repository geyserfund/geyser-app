import { getPath } from '../../../constants'
import { LandingCardBase } from '../../../shared/components/layouts'
import { ProjectForSubscriptionFragment } from '../../../types'

export const LandingSubscriptionCard = ({ project }: { project: ProjectForSubscriptionFragment }) => {
  const owner = project?.owners?.[0]

  return (
    <LandingCardBase
      to={getPath('project', project?.name)}
      hasSubscribe
      title={project?.name}
      imageSrc={project?.thumbnailImage || ''}
      project={project}
      user={owner?.user}
    />
  )
}
