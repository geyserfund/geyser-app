import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, NavBarItems } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'
import { H1 } from '@/shared/components/typography'
import { dimensions } from '@/shared/constants'
import { standardPadding } from '@/styles'
import { useMobileMode } from '@/utils'

import { Contributions, Leaderboard } from './views'

enum LeaderboardView {
  Leaderboard = 'Leaderboard',
  Contributions = 'Contributions',
}

export const ProjectLeaderboard = () => {
  const isMobile = useMobileMode()

  if (isMobile) {
    return <ProjectLeaderboardMobile />
  }

  return (
    <HStack w="full" h="full" alignItems="start" spacing={4} pb={6}>
      <VStack h="full" flex={8} alignItems="start">
        <H1 size="2xl" bold dark>
          {t('Leaderboard')}
        </H1>
        <Leaderboard />
      </VStack>
      <VStack h="full" flex={5} alignItems="start">
        <H1 size="2xl" bold dark>
          {t('Contributions')}
        </H1>
        <Contributions />
      </VStack>
    </HStack>
  )
}

const ProjectLeaderboardMobile = () => {
  const items: NavBarItems[] = [
    {
      name: t('Leaderboard'),
      key: LeaderboardView.Leaderboard,
      render: () => <Leaderboard />,
    },
    {
      name: t('Contributions'),
      key: LeaderboardView.Contributions,
      render: () => <Contributions />,
    },
  ]

  const { render, ...animatedNavBarProps } = useAnimatedNavBar({ items, defaultView: LeaderboardView.Leaderboard })

  return (
    <CardLayout dense w="full" h="100%" paddingTop={standardPadding}>
      <HStack w="full" position="absolute" top={standardPadding} paddingX={standardPadding}>
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
      </HStack>
      <VStack paddingTop={`${dimensions.projectNavBar.mobile.height}px`}>{render && render()}</VStack>
    </CardLayout>
  )
}
