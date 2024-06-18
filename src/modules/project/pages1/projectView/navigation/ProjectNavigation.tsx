import { HStack } from '@chakra-ui/react'
import { useAtomValue } from 'jotai'
import { useMemo } from 'react'
import { PiBag, PiFlagBannerFold, PiGear, PiMedalMilitary, PiNewspaper, PiSparkle } from 'react-icons/pi'
import { useLocation } from 'react-router-dom'

import { PathName } from '../../../../../constants'
import { AnimatedNavBar, NavBarItems } from '../../../../../shared/components/navigation/AnimatedNavBar'
import { useMobileMode } from '../../../../../utils'
import { hasEntriesAtom } from '../../../state/entriesAtom'
import { hasGoalsAtom } from '../../../state/goalsAtom'
import { isProjectOwnerAtom } from '../../../state/projectAtom'
import { hasRewardsAtom } from '../../../state/rewardsAtom'
export const ProjectNavigation = ({ showLabel }: { showLabel?: boolean }) => {
  const location = useLocation()

  const isMobile = useMobileMode()

  const hasEntries = useAtomValue(hasEntriesAtom)
  const hasRewards = useAtomValue(hasRewardsAtom)
  const hasGoals = useAtomValue(hasGoalsAtom)
  const isProjectOwner = useAtomValue(isProjectOwnerAtom)

  console.log('checking goals', hasGoals)

  const ProjectNavigationButtons = useMemo(() => {
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
  }, [hasEntries, hasGoals, hasRewards, isProjectOwner])

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
    <HStack w="full" position="absolute" top="0">
      <AnimatedNavBar
        items={ProjectNavigationButtons}
        activeItem={activeButtonIndex}
        showIcon={isMobile}
        showLabel={!isMobile}
      />
    </HStack>
  )
}
