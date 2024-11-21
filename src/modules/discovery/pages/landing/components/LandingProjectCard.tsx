import { CardLayoutProps, LandingCardBase } from '../../../../../shared/components/layouts'
import { getPathWithGeyserHero } from '../../../../../shared/constants'
import { ProjectForLandingPageFragment } from '../../../../../types'

interface LandingProjectCardProps extends Omit<CardLayoutProps, 'to'> {
  project: ProjectForLandingPageFragment
  isMobile?: boolean
}

export const LandingProjectCard = ({ project, isMobile, ...rest }: LandingProjectCardProps) => {
  return <LandingCardBase to={getPathWithGeyserHero('project', project.name)} project={project} {...rest} />
}
