import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
  PiBag,
  PiBagBold,
  PiFlagBannerFold,
  PiFlagBannerFoldBold,
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
import { PathName } from '@/shared/constants'
import { useMobileMode } from '@/utils'

import { BackToProjectRow } from './components/BackToProjectRow.tsx'
import { TopNavContainer } from '../../navigation/components/topNav/TopNavContainer'
import { useProjectAtom, useRewardsAtom } from '../hooks/useProjectAtom'
import { showProjectNavBarForDesktopAtom, showProjectNavBarForMobileAtom } from './projectNavigationAtom'

export const ProjectNavigation = () => {
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')
  const pathnameSegments = location.pathname.split('/').filter(Boolean)
  const isDashboardUrl = pathnameSegments.includes('dashboard')
  const navigate = useNavigate()

  const isMobile = useMobileMode()

  const { loading: userLoading } = useAuthContext()
  const { isProjectOwner, loading, project } = useProjectAtom()
  const { activeRewards, hasRewards, initialRewardsLoading } = useRewardsAtom()

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

    if (hasRewards) {
      const buyProductLabel =
        !initialRewardsLoading && activeRewards.length > 0
          ? `Buy product (${activeRewards.length})`
          : 'Buy product'
      buttonList.push({
        name: buyProductLabel,
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

    if (!isDraftUrl) {
      buttonList.push({
        name: 'Community',
        path: PathName.projectLeaderboard,
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

    return buttonList
  }, [
    activeRewards.length,
    hasRewards,
    initialRewardsLoading,
    isProjectOwner,
    isDraftUrl,
    navigate,
    project.entriesCount,
    project.goalsCount,
  ])

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

  // Show Back to project row when in dashboard
  if (isDashboardUrl && isProjectOwner) {
    return (
      <TopNavContainer zIndex={9}>
        <BackToProjectRow projectName={project.name} />
      </TopNavContainer>
    )
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
