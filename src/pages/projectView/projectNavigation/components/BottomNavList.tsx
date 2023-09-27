import { IconProps } from '@chakra-ui/react'

import {
  ContributorsIcon,
  InsightsIcon,
  LeaderboardNavIcon,
  OverviewIcon,
  RewardGiftIcon,
} from '../../../../components/icons'
import { ProjectIcon } from '../../../../components/icons/svg/ProjectIcon'
import { PathName } from '../../../../constants'
import { MobileViews } from '../../../../context'

export type ProjectNavigationItem = {
  icon: (props: IconProps) => JSX.Element
  name: string
  isCreator?: boolean
  isContributor?: boolean
  pathName?: PathName
  mobileView?: MobileViews
}

export const navigationItems: ProjectNavigationItem[] = [
  {
    icon: OverviewIcon,
    pathName: PathName.projectOverview,
    name: 'Overview',
    isCreator: true,
  },
  {
    icon: InsightsIcon,
    pathName: PathName.projectInsights,
    name: 'Insights',
    isCreator: true,
  },
  {
    icon: ContributorsIcon,
    pathName: PathName.projectContributors,
    name: 'Contributors',
    isCreator: true,
  },
  {
    icon: ProjectIcon,
    mobileView: MobileViews.description,
    name: 'Project',
    isCreator: true,
    isContributor: true,
  },

  {
    icon: RewardGiftIcon,
    mobileView: MobileViews.rewards,
    name: 'Rewards',
    isContributor: true,
  },

  {
    icon: LeaderboardNavIcon,
    mobileView: MobileViews.leaderboard,
    name: 'Leaderboard',
    isContributor: true,
  },
]
