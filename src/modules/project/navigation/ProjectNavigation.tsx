import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
  PiBag,
  PiBagBold,
  PiFlagBannerFold,
  PiFlagBannerFoldBold,
  PiGear,
  PiGearBold,
  PiMedalMilitary,
  PiMedalMilitaryBold,
  PiNewspaper,
  PiNewspaperBold,
  PiRocketLaunch,
  PiRocketLaunchBold,
  PiSignOut,
} from 'react-icons/pi'
import { useLocation, useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { getPath } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { TopNavContainer } from '../../navigation/components/topNav/TopNavContainer'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { showProjectNavBarForDesktopAtom, showProjectNavBarForMobileAtom } from './projectNavigationAtom'

type ProjectNavigationProps = {
  inBottomBar?: boolean
}

export const ProjectNavigation = ({ inBottomBar = false }: ProjectNavigationProps) => {
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')
  const navigate = useNavigate()

  const isMobile = useMobileMode()

  const { loading: userLoading } = useAuthContext()
  const { isProjectOwner, loading, project } = useProjectAtom()

  const showProjectNavBarForMobile = useAtomValue(showProjectNavBarForMobileAtom)

  const showProjectNavBarForDesktop = useAtomValue(showProjectNavBarForDesktopAtom)

  const ProjectNavigationButtons = useMemo(() => {
    const buttonList = [
      {
        name: 'Story',
        path: getPath('project', project.name),
        icon: PiRocketLaunch,
        activeIcon: PiRocketLaunchBold,
      },
    ] as AnimatedNavBarItem[]

    if (project.rewardsCount) {
      buttonList.push({
        name: `Buy product (${project.rewardsCount})`,
        path: getPath('projectRewards', project.name),
        icon: PiBag,
        activeIcon: PiBagBold,
      })
    }

    if (project.entriesCount) {
      buttonList.push({
        name: 'Updates',
        path: getPath('projectPosts', project.name),
        icon: PiNewspaper,
        activeIcon: PiNewspaperBold,
      })
    }

    if (project.goalsCount) {
      buttonList.push({
        name: 'Goals',
        path: getPath('projectGoals', project.name),
        icon: PiFlagBannerFold,
        activeIcon: PiFlagBannerFoldBold,
      })
    }

    if (!isDraftUrl) {
      buttonList.push({
        name: 'Community',
        path: getPath('projectLeaderboard', project.name),
        icon: PiMedalMilitary,
        activeIcon: PiMedalMilitaryBold,
      })
    }

    if (isProjectOwner && isDraftUrl) {
      buttonList.push({
        name: 'Exit Preview',
        onClick: () => navigate(-1),
        icon: PiSignOut,
        showIconAlways: true,
        isBordered: true,
      })
    }

    if (isProjectOwner && !isDraftUrl) {
      buttonList.push({
        name: 'Dashboard',
        path: getPath('projectDashboard', project.name),
        icon: PiGear,
        activeIcon: PiGearBold,
        showIconAlways: true,
        isBordered: true,
      })
    }

    return buttonList
  }, [project, isProjectOwner, isDraftUrl, navigate])

  const activeButtonIndex = useMemo(() => {
    let activeIndex = 0
    ProjectNavigationButtons.map((navButton) => {
      if (navButton.path && location.pathname.includes(navButton.path)) {
        activeIndex = ProjectNavigationButtons.indexOf(navButton)
      }
    })
    return activeIndex
  }, [location.pathname, ProjectNavigationButtons])

  if (inBottomBar) {
    if (!isMobile || isProjectOwner) {
      return null
    }

    return (
      <AnimatedNavBar
        items={ProjectNavigationButtons}
        activeIndex={activeButtonIndex}
        showIcon
        showLabel={false}
        loading={loading || userLoading}
        zIndex={9}
      />
    )
  }

  if ((isMobile && !showProjectNavBarForMobile) || (!isMobile && !showProjectNavBarForDesktop)) {
    return null
  }

  if (isMobile && !isProjectOwner) {
    return null
  }

  return (
    <TopNavContainer zIndex={9}>
      <AnimatedNavBar
        items={ProjectNavigationButtons}
        activeIndex={activeButtonIndex}
        showIcon={isMobile}
        showLabel={!isMobile}
        loading={loading || userLoading}
        zIndex={9}
      />
    </TopNavContainer>
  )
}
