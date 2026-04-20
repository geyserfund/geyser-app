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
  statusPillLabel?: string
  trendingAmountLabel?: string
}

export const LandingProjectCard = ({
  project,
  isMobile,
  statusPillLabel,
  trendingAmountLabel,
  ...rest
}: LandingProjectCardProps) => {
  return (
    <LandingCardBase
      to={getPathWithGeyserPromotionsHero('project', project.name)}
      project={project}
      raiseOnHover
      statusPillLabel={statusPillLabel}
      trendingAmountLabel={trendingAmountLabel}
      {...rest}
    />
  )
}
