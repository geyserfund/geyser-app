import { getPath } from '../../../shared/constants'
import { CardLayoutProps, LandingCardBase } from '../../../shared/components/layouts'
import { ProjectForLandingPageFragment } from '../../../types'

interface LandingProjectCardProps extends Omit<CardLayoutProps, 'to'> {
  project: ProjectForLandingPageFragment
  isMobile?: boolean
}

export const LandingProjectCard = ({ project, isMobile, ...rest }: LandingProjectCardProps) => {
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
      project={project}
      minHeight="125px"
      {...rest}
    />
  )
}
