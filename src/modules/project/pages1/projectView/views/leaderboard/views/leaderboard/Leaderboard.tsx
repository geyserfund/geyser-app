import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { dimensions } from '@/shared/constants/components/dimensions.ts'
import { ProjectLeaderboardPeriod } from '@/types'
import { toPx, useMobileMode } from '@/utils'

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

  const navItems: AnimatedNavBarItem[] = useMemo(() => {
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
        name: t('Contributions'),
        key: LeaderboardView.Contributions,
        render: () => <Contributions />,
      })
    }

    return list
  }, [currentDateTime, isMobile, period])

  const { render, items, ...animatedNavBarProps } = useAnimatedNavBar({
    items: navItems,
    defaultView: LeaderboardView.Contributors,
  })

  const uniqItems = _.uniqBy(items, (data) => data.key)

  return (
    <CardLayout dense noMobileBorder w="full" paddingTop={{ base: 6, lg: 6 }} flex={1}>
      <HStack
        w="full"
        paddingX={{ base: 3, lg: 6 }}
        position={{ base: 'fixed', lg: 'absolute' }}
        top={{ base: toPx(dimensions.topNavBar.mobile.height + dimensions.projectNavBar.mobile.height + 40), lg: 6 }}
        left={{ base: 0, lg: 'unset' }}
        background="utils.pbg"
        paddingBottom={2}
        paddingTop={{ base: 3, lg: 0 }}
        zIndex={3}
      >
        <AnimatedNavBar items={uniqItems} {...animatedNavBarProps} showLabel />
      </HStack>
      <VStack w="full" h="full" pt={`${dimensions.animatedNavBar.height.base + 8}px`}>
        {render && render()}
      </VStack>
    </CardLayout>
  )
}
