import { AddIcon } from '@chakra-ui/icons'
import { IconProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { AiFillHome, AiFillShop } from 'react-icons/ai'
import { BsBarChartFill, BsFillTrophyFill } from 'react-icons/bs'
import { FaListUl } from 'react-icons/fa'

import { OverviewIcon } from '../../../../components/icons'
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
    icon: AiFillHome,
    iconProps: {
      fontSize: '24px',
    },
    mobileView: MobileViews.description,
    name: 'Project',
    isCreator: true,
    isContributor: true,
  },
  {
    icon: OverviewIcon,
    pathName: PathName.projectOverview,
    mobileView: MobileViews.overview,
    iconProps: {
      width: '40px',
      height: '40px',
    },
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
    icon: BsBarChartFill,
    iconProps: {
      fontSize: '24px',
    },
    pathName: PathName.projectInsights,
    mobileView: MobileViews.insights,
    name: 'Insights',
    isCreator: true,
  },
  {
    icon: FaListUl,
    iconProps: {
      fontSize: '28px',
    },
    pathName: PathName.projectContributors,
    mobileView: MobileViews.contributors,
    name: 'Contributors',
    isCreator: true,
  },
  {
    icon: AiFillShop,
    iconProps: {
      fontSize: '25px',
    },
    pathName: PathName.projectRewards,
    mobileView: MobileViews.rewards,
    name: 'Rewards',
    isContributor: true,
  },
  {
    icon: BsFillTrophyFill,
    iconProps: {
      fontSize: '23px',
    },
    mobileView: MobileViews.leaderboard,
    name: 'Leaderboard',
    isContributor: true,
  },
]
