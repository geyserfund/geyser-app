import { Button, HStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import {
  PiArrowLeft,
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
import { Link, useLocation, useNavigate } from 'react-router'

import { useAuthContext } from '@/context'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { getPath, PathName } from '@/shared/constants'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { useMobileMode } from '@/utils'

import { TopNavContainer } from '../../navigation/components/topNav/TopNavContainer'
import { useProjectAtom } from '../hooks/useProjectAtom'
import { showProjectNavBarForDesktopAtom, showProjectNavBarForMobileAtom } from './projectNavigationAtom'

export const ProjectNavigation = () => {
  const location = useLocation()
  const isDraftUrl = location.pathname.includes('/draft')
  const isDashboardUrl = location.pathname.includes('/dashboard')
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
        path: '',
        icon: PiRocketLaunch,
        activeIcon: PiRocketLaunchBold,
      },
    ] as AnimatedNavBarItem[]

    if (project.rewardsCount) {
      buttonList.push({
        name: `Buy product (${project.rewardsCount})`,
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

  if ((isMobile && !showProjectNavBarForMobile) || (!isMobile && !showProjectNavBarForDesktop)) {
    return null
  }

  // Show Back to project button when in dashboard
  if (isDashboardUrl && isProjectOwner) {
    return (
      <HStack
        position="fixed"
        top={{ base: `${dimensions.topNavBar.mobile.height}px`, lg: `${dimensions.topNavBar.desktop.height}px` }}
        left={{ base: 0, lg: `${dimensions.project.dashboard.menu.width}px` }}
        width={{ base: '100%', lg: `calc(100% - ${dimensions.project.dashboard.menu.width + 24 * 2 + 1}px)` }}
        paddingX={{ base: 3, lg: 6 }}
        bg="neutral1.3"
        borderRadius={8}
        zIndex={9}
      >
        <HStack borderRadius="8px" paddingX={4} paddingY={2} w="full">
          <Button
            as={Link}
            to={getPath('project', project.name)}
            size="sm"
            variant="ghost"
            colorScheme="neutral1"
            leftIcon={<PiArrowLeft />}
          >
            {t('Back to project')}
          </Button>
        </HStack>
      </HStack>
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
