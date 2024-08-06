import { HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { DateTime } from 'luxon'
import { useMemo } from 'react'

import { LeaderboardPeriod } from '@/modules/project/state/fundersAtom'
import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'
import { useMobileMode } from '@/utils'

import { LeaderboardList } from './LeaderboardList'

export const MAXIMUM_LEADERBOARD_ITEMS = 30

export const Leaderboard = () => {
  const isMobile = useMobileMode()

  const currentDateTime = DateTime.now()

  const items: AnimatedNavBarItem[] = useMemo(
    () => [
      {
        name: t('All time'),
        key: LeaderboardPeriod.allTime,
        render: () => <LeaderboardList period={LeaderboardPeriod.allTime} dateTime={currentDateTime} />,
      },
      {
        name: t('Last month'),
        key: LeaderboardPeriod.lastMonth,
        render: () => <LeaderboardList period={LeaderboardPeriod.lastMonth} dateTime={currentDateTime} />,
      },
      {
        name: t('Last week'),
        key: LeaderboardPeriod.lastWeek,
        render: () => <LeaderboardList period={LeaderboardPeriod.lastWeek} dateTime={currentDateTime} />,
      },
    ],
    [currentDateTime],
  )

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: LeaderboardPeriod.allTime })

  if (isMobile) {
    return (
      <Tabs w="full" paddingX={standardPadding}>
        <TabList w="full">
          {items.map((item) => (
            <Tab key={item.key} flex={1}>
              {item.name}
            </Tab>
          ))}
        </TabList>

        <TabPanels paddingX={0}>
          {items.map((item) => (
            <TabPanel key={item.key} paddingX={0}>
              {item.render && item.render()}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
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
