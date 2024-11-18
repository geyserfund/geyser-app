import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/shared/styles'
import { ProjectLeaderboardPeriod } from '@/types'
import { useMobileMode } from '@/utils'

import { Contributions } from '../contributions/Contributions'
import { AmabassadorList } from './AmabassadorList'
import { LeaderboardList } from './LeaderboardList'

export const MAXIMUM_LEADERBOARD_ITEMS = 30

enum LeaderboardView {
  Contributors = 'Contributors',
  Ambassadors = 'Ambassadors',
  Contributions = 'Contributions',
}

export const Leaderboard = ({ period }: { period: ProjectLeaderboardPeriod }) => {
  const isMobile = useMobileMode()

  const currentDateTime = DateTime.now()

  const items: AnimatedNavBarItem[] = useMemo(() => {
    const list = [
      {
        name: t('Contributors'),
        key: LeaderboardView.Contributors,
        render: () => <LeaderboardList period={period} dateTime={currentDateTime} />,
      },
      {
        name: t('Ambassadors'),
        key: LeaderboardView.Ambassadors,
        render: () => <AmabassadorList period={period} dateTime={currentDateTime} />,
      },
    ]

    if (isMobile) {
      list.push({
        name: t('Contributors'),
        key: LeaderboardView.Contributions,
        render: () => <Contributions />,
      })
    }

    return list
  }, [currentDateTime, isMobile, period])

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: LeaderboardView.Contributors })

  return (
    <CardLayout dense noMobileBorder w="full" paddingTop={standardPadding} flex={1}>
      <HStack w="full" paddingX={{ base: 0, lg: 6 }} position="absolute" top={standardPadding} paddingBottom={2}>
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
      </HStack>
      <VStack w="full" h="full" pt={`${dimensions.animatedNavBar.height.base + 8}px`}>
        {render && render()}
      </VStack>
    </CardLayout>
  )
}
