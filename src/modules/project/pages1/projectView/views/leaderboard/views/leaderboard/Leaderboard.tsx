import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { AnimatedTabBar } from '@/shared/components/navigation/AnimatedTabBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'
import { ProjectLeaderboardPeriod } from '@/types'
import { useCustomTheme, useMobileMode } from '@/utils'

import { LeaderboardList } from './LeaderboardList'

export const MAXIMUM_LEADERBOARD_ITEMS = 30

export const Leaderboard = () => {
  const isMobile = useMobileMode()
  const { colors } = useCustomTheme()

  const currentDateTime = DateTime.now()

  const items: AnimatedNavBarItem[] = useMemo(
    () => [
      {
        name: t('All time'),
        key: ProjectLeaderboardPeriod.AllTime,
        render: () => <LeaderboardList period={ProjectLeaderboardPeriod.AllTime} dateTime={currentDateTime} />,
      },
      {
        name: t('Last month'),
        key: ProjectLeaderboardPeriod.Month,
        render: () => <LeaderboardList period={ProjectLeaderboardPeriod.Month} dateTime={currentDateTime} />,
      },
      {
        name: t('Last week'),
        key: ProjectLeaderboardPeriod.Week,
        render: () => <LeaderboardList period={ProjectLeaderboardPeriod.Week} dateTime={currentDateTime} />,
      },
    ],
    [currentDateTime],
  )

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: ProjectLeaderboardPeriod.AllTime })

  if (isMobile) {
    return (
      <VStack w="full">
        <HStack
          width="calc(100% - 24px)"
          position="fixed"
          top={`${dimensions.topNavBar.mobile.height + dimensions.projectNavBar.mobile.height * 2 - 5}px`}
          backgroundColor={'utils.pbg'}
          zIndex={1}
          paddingTop={2}
        >
          <AnimatedTabBar {...animatedNavBarProps} activeTabColor={colors.utils.text} />
        </HStack>
        <VStack w="full" h="full" pt={dimensions.animatedNavBar.height}>
          {render && render()}
        </VStack>
      </VStack>
    )
  }

  return (
    <CardLayout dense w="full" paddingTop={standardPadding} flex={1}>
      <HStack w="full" paddingX={standardPadding} position="absolute" top={standardPadding}>
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
      </HStack>
      <VStack w="full" h="full" pt={dimensions.animatedNavBar.height}>
        {render && render()}
      </VStack>
    </CardLayout>
  )
}
