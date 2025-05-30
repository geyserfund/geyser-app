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
} from 'react-icons/pi'
import { useLocation } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { PathName } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { TopNavContainer } from '../../navigation/components/topNav/TopNavContainer'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { showProjectNavBarForDesktopAtom, showProjectNavBarForMobileAtom } from './projectNavigationAtom'

export const ProjectNavigation = () => {
  const location = useLocation()

  const isMobile = useMobileMode()

  const { loading: userLoading } = useAuthContext()
  const { isProjectOwner, loading, project } = useProjectAtom()

  const showProjectNavBarForMobile = useAtomValue(showProjectNavBarForMobileAtom)

  const showProjectNavBarForDesktop = useAtomValue(showProjectNavBarForDesktopAtom)

  const ProjectNavigationButtons = useMemo(() => {
    const buttonList = [
      {
        name: 'Story',
        path: '',
        icon: PiRocketLaunch,
        activeIcon: PiRocketLaunchBold,
      },
    ] as AnimatedNavBarItem[]

    if (project.rewardsCount) {
      buttonList.push({
        name: 'Shop',
        path: PathName.projectRewards,
        icon: PiBag,
        activeIcon: PiBagBold,
      })
    }

    if (project.entriesCount) {
      buttonList.push({
        name: 'Updates',
        path: PathName.projectPosts,
        icon: PiNewspaper,
        activeIcon: PiNewspaperBold,
      })
    }

    if (project.goalsCount) {
      buttonList.push({
        name: 'Goals',
        path: PathName.projectGoals,
        icon: PiFlagBannerFold,
        activeIcon: PiFlagBannerFoldBold,
      })
    }

    buttonList.push({
      name: 'Community',
      path: PathName.projectLeaderboard,
      icon: PiMedalMilitary,
      activeIcon: PiMedalMilitaryBold,
    })

    if (isProjectOwner) {
      buttonList.push({
        name: 'Dashboard',
        path: PathName.projectDashboard,
        icon: PiGear,
        activeIcon: PiGearBold,
        showIconAlways: true,
        isBordered: true,
      })
    }

    return buttonList
  }, [project, isProjectOwner])

  const activeButtonIndex = useMemo(() => {
    let activeIndex = 0
    ProjectNavigationButtons.map((navButton) => {
      if (navButton.path && location.pathname.includes(navButton.path)) {
        activeIndex = ProjectNavigationButtons.indexOf(navButton)
      }
    })
    return activeIndex
  }, [location.pathname, ProjectNavigationButtons])

  if ((isMobile && !showProjectNavBarForMobile) || (!isMobile && !showProjectNavBarForDesktop)) {
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
