import { LandingCardBase } from '../../../components/layouts'
import { getPath } from '../../../constants'
import { useProjectForSubscriptionQuery } from '../../../types'

export const LandingSubscriptionCard = ({ projectName }: { projectName: string }) => {
  const { data } = useProjectForSubscriptionQuery({
    variables: {
      where: {
        name: projectName,
      },
    },
  })

  const project = data?.projectGet
  const owner = project?.owners[0]

  if (!project || !owner) {
    return null
  }

  return (
    <LandingCardBase
      to={getPath('project', project?.name)}
      hasSubscribe
      title={project?.name}
      imageSrc={project?.thumbnailImage || ''}
      project={project}
      user={owner.user}
    />
  )
}
