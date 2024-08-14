import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { PiBag, PiFlagBannerFold, PiGear, PiMedalMilitary, PiNewspaper, PiSparkle } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'

import { useAuthContext } from '@/context'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { PathName } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { useProjectAtom, useRewardsAtom } from '../hooks/useProjectAtom'
import { TopNavContainer } from './components/TopNavContainer'
import { showProjectNavBarForDesktopAtom, showProjectNavBarForMobileAtom } from './projectNavigationAtom'

export const ProjectNavigation = () => {
  const location = useLocation()

  const isMobile = useMobileMode()

  const { loading: userLoading } = useAuthContext()
  const { isProjectOwner, loading, project } = useProjectAtom()
  const { activeRewards, rewards } = useRewardsAtom()

  const showRewards = isProjectOwner ? rewards.length > 0 : activeRewards.length > 0

  const showProjectNavBarForMobile = useAtomValue(showProjectNavBarForMobileAtom)

  const showProjectNavBarForDesktop = useAtomValue(showProjectNavBarForDesktopAtom)

  const ProjectNavigationButtons = useMemo(() => {
    const buttonList = [
      {
        name: 'Project',
        path: '',
        icon: PiSparkle,
      },
    ] as AnimatedNavBarItem[]

    if (showRewards) {
      buttonList.push({
        name: 'Rewards',
        path: PathName.projectRewards,
        icon: PiBag,
      })
    }

    if (project.entriesCount) {
      buttonList.push({
        name: 'Posts',
        path: PathName.projectPosts,
        icon: PiNewspaper,
      })
    }

    if (project.goalsCount) {
      buttonList.push({
        name: 'Goals',
        path: PathName.projectGoals,
        icon: PiFlagBannerFold,
      })
    }

    buttonList.push({
      name: 'Leaderboard',
      path: PathName.projectLeaderboard,
      icon: PiMedalMilitary,
    })
    if (isProjectOwner) {
      buttonList.push({
        name: 'Dashboard',
        path: PathName.projectDashboard,
        icon: PiGear,
        showIconAlways: true,
        isBordered: true,
      })
    }

    return buttonList
  }, [project, isProjectOwner, showRewards])

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
