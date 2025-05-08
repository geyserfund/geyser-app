import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'

import { LandingCardBase } from '../../../../../shared/components/layouts'
import { getPathWithGeyserHero } from '../../../../../shared/constants'
import { ContributionsSummary, ProjectForLandingPageFragment } from '../../../../../types'

interface LandingProjectCardProps extends Omit<CardLayoutProps, 'to'> {
  project: ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  }
  isMobile?: boolean
}

export const LandingProjectCard = ({ project, isMobile, ...rest }: LandingProjectCardProps) => {
  return <LandingCardBase to={getPathWithGeyserHero('project', project.name)} project={project} {...rest} />
}
