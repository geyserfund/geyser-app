import { HStack, StackProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { PiBag, PiFlagBannerFold, PiGear, PiMedalMilitary, PiNewspaper, PiSparkle } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'

import { dimensions, PathName } from '../../../../../constants'
import { AnimatedNavBar, NavBarItems } from '../../../../../shared/components/navigation/AnimatedNavBar'
import { standardPadding } from '../../../../../styles'
import { useMobileMode } from '../../../../../utils'
import { useGoalsAtom, useProjectAtom } from '../../../hooks/useProjectAtom'
import { hasEntriesAtom } from '../../../state/entriesAtom'
import { hasRewardsAtom } from '../../../state/rewardsAtom'
export const ProjectNavigation = () => {
  const location = useLocation()

  const isMobile = useMobileMode()

  const { isProjectOwner, loading, project } = useProjectAtom()

  const ProjectNavigationButtons = useMemo(() => {
    const buttonList = [
      {
        name: 'Project',
        path: '',
        icon: PiSparkle,
      },
    ] as NavBarItems[]

    if (project.hasRewards) {
      buttonList.push({
        name: 'Rewards',
        path: PathName.projectRewards,
        icon: PiBag,
      })
    }

    if (project.hasEntries) {
      buttonList.push({
        name: 'Posts',
        path: PathName.projectEntries,
        icon: PiNewspaper,
      })
    }

    if (project.hasGoals) {
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

  return (
    <HStack
      maxWidth={{ base: dimensions.maxWidth + 24, lg: dimensions.maxWidth + 40 }}
      w="full"
      position="fixed"
      top={{ base: `${dimensions.topNavBar.mobile.height}px`, lg: `${dimensions.topNavBar.desktop.height}px` }}
      paddingX={standardPadding}
      paddingBottom={{ base: 3, lg: 4 }}
      background={'utils.pbg'}
      zIndex={1}
    >
      <AnimatedNavBar
        items={ProjectNavigationButtons}
        activeItem={activeButtonIndex}
        showIcon={isMobile}
        showLabel={!isMobile}
        loading={loading}
      />
    </HStack>
  )
}
