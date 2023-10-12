import { AddIcon } from '@chakra-ui/icons'
import { IconProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import {
  ContributorsNavIcon,
  HomeNavIcon2,
  InsightsNavIcon,
  LeaderboardNavIcon,
  OverviewNavIcon,
  RewardGiftIcon,
} from '../../../../components/icons'
import { PathName } from '../../../../constants'
import { MobileViews } from '../../../../context'

export type ProjectNavigationItem = {
  icon: IconType | React.FC<IconProps>
  name: string
  isCreator?: boolean
  isContributor?: boolean
  iconProps?: any
  pathName?: PathName
  onClick?: string
  mobileView: MobileViews
}

export const navigationItems: ProjectNavigationItem[] = [
  {
    icon: HomeNavIcon2,
    mobileView: MobileViews.description,
    name: 'Project',
    isCreator: true,
    isContributor: true,
  },
  {
    icon: OverviewNavIcon,
    pathName: PathName.projectOverview,
    mobileView: MobileViews.overview,
    name: 'Overview',
    isCreator: true,
  },
  {
    icon: AddIcon,
    name: 'Create',
    mobileView: MobileViews.description,
    isCreator: true,
    onClick: 'create',
  },
  {
    icon: InsightsNavIcon,
    pathName: PathName.projectInsights,
    mobileView: MobileViews.insights,
    name: 'Insights',
    isCreator: true,
  },
  {
    icon: ContributorsNavIcon,
    pathName: PathName.projectContributors,
    mobileView: MobileViews.contributors,
    name: 'Contributors',
    isCreator: true,
  },
  {
    icon: RewardGiftIcon,
    pathName: PathName.projectRewards,
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
