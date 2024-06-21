import { HStack, StackProps } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { PiBag, PiFlagBannerFold, PiGear, PiMedalMilitary, PiNewspaper, PiSparkle } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'

import { dimensions, PathName } from '../../../../../constants'
import { AnimatedNavBar, NavBarItems } from '../../../../../shared/components/navigation/AnimatedNavBar'
import { standardPadding } from '../../../../../styles'
import { useMobileMode } from '../../../../../utils'
import { hasEntriesAtom } from '../../../state/entriesAtom'
import { hasGoalsAtom } from '../../../state/goalsAtom'
import { hasRewardsAtom } from '../../../state/rewardsAtom'
import { useProjectAtom } from '../hooks/useProjectAtom'
export const ProjectNavigation = () => {
  const location = useLocation()

  const isMobile = useMobileMode()

  const { isProjectOwner, loading } = useProjectAtom()

  const hasEntries = useAtomValue(hasEntriesAtom)
  const hasRewards = useAtomValue(hasRewardsAtom)
  const hasGoals = useAtomValue(hasGoalsAtom)

  console.log('checking goals', hasGoals)

  const ProjectNavigationButtons = useMemo(() => {
    if (loading) return []

    const buttonList = [
      {
        name: 'Project',
        path: '',
        icon: PiSparkle,
      },
    ] as NavBarItems[]

    if (hasRewards) {
      buttonList.push({
        name: 'Rewards',
        path: PathName.projectRewards,
        icon: PiBag,
      })
    }

    if (hasEntries) {
      buttonList.push({
        name: 'Posts',
        path: PathName.projectEntries,
        icon: PiNewspaper,
      })
    }

    if (hasGoals) {
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
  }, [hasEntries, hasGoals, hasRewards, isProjectOwner, loading])

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
      top={{ base: dimensions.topNavBar.mobile.height, lg: dimensions.topNavBar.desktop.height }}
      paddingX={standardPadding}
      background={'utils.pbg'}
      zIndex={1}
    >
      <AnimatedNavBar
        items={ProjectNavigationButtons}
        activeItem={activeButtonIndex}
        showIcon={isMobile}
        showLabel={!isMobile}
      />
    </HStack>
  )
}
