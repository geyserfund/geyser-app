import { AddIcon } from '@chakra-ui/icons'
import { IconProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

import {
  ContributorsNavIcon,
  GoalIcon,
  HomeNavIcon2,
  InsightsNavIcon,
  LeaderboardNavIcon,
  RewardGiftIcon,
} from '@/components/icons'
import { PathName } from '@/shared/constants'

export type ProjectNavigationItem = {
  icon: IconType | React.FC<IconProps>
  name: string
  isCreator?: boolean
  isContributor?: boolean
  iconProps?: any
  pathName?: PathName
  onClick?: string
}

export const navigationItems: ProjectNavigationItem[] = [
  {
    icon: HomeNavIcon2,
    name: 'Project',
    isCreator: true,
    isContributor: true,
  },
  {
    icon: GoalIcon,
    pathName: PathName.projectGoals,
    name: 'Goals',
    isCreator: true,
    isContributor: true,
  },

  {
    icon: AddIcon,
    name: 'Create',
    isCreator: true,
    onClick: 'create',
  },
  {
    icon: InsightsNavIcon,
    pathName: PathName.projectInsights,
    name: 'Insights',
    isCreator: true,
  },
  {
    icon: ContributorsNavIcon,
    pathName: PathName.projectContributors,
    name: 'Contributors',
    isCreator: true,
  },
  {
    icon: RewardGiftIcon,
    pathName: PathName.projectRewards,
    name: 'Rewards',
    isContributor: true,
  },
  {
    icon: LeaderboardNavIcon,
    name: 'Leaderboard',
    isContributor: true,
  },
]
