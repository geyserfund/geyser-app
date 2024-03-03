import { LandingCardBase } from '../../../components/layouts'
import { getPath } from '../../../constants'
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
