import { CardLayoutProps, LandingCardBase } from '../../../components/layouts'
import { getPath } from '../../../constants'
import { ProjectForLandingPageFragment } from '../../../types'

interface LandingProjectCardProps extends Omit<CardLayoutProps, 'to'> {
  project: ProjectForLandingPageFragment
  isMobile?: boolean
}

export const LandingProjectCard = ({
  project,
  isMobile,
  ...rest
}: LandingProjectCardProps) => {
  if (!project.owners[0]) {
    return null
  }

  return (
    <LandingCardBase
      to={getPath('project', project.name)}
      isMobile={isMobile}
      imageSrc={`${project.thumbnailImage}`}
      title={project.title}
      user={project.owners[0].user}
      fundersCount={project.fundersCount || 0}
      amountFunded={project.balance}
      projectId={project.id}
      minHeight="125px"
      {...rest}
    />
  )
}
