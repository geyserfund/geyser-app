import { CardLayoutProps } from '@/shared/components/layouts/CardLayout'

import { LandingCardBase } from '../../../../../shared/components/layouts'
import { getPathWithGeyserPromotionsHero } from '../../../../../shared/constants'
import { ContributionsSummary, ProjectForLandingPageFragment } from '../../../../../types'

interface LandingProjectCardProps extends CardLayoutProps {
  project: ProjectForLandingPageFragment & {
    contributionSummary?: Pick<ContributionsSummary, 'contributionsTotalUsd' | 'contributionsTotal'>
  }
  isMobile?: boolean
  noMobile?: boolean
  hideContributionContent?: boolean
}

export const LandingProjectCard = ({ project, isMobile, ...rest }: LandingProjectCardProps) => {
  return (
    <LandingCardBase
      to={getPathWithGeyserPromotionsHero('project', project.name)}
      project={project}
      raiseOnHover
      {...rest}
    />
  )
}
