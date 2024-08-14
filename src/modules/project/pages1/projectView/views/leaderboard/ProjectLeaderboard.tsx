import { HStack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
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
    <HStack w="full" h="full" alignItems="start" spacing={dimensions.project.rightSideNav.gap} pb={6}>
      <VStack h="full" flex={1} alignItems="start">
        <H1 size="2xl" bold dark>
          {t('Leaderboard')}
        </H1>
        <Leaderboard />
      </VStack>
      <VStack h="full" width="full" maxWidth={dimensions.project.rightSideNav.width} alignItems="start">
        <H1 size="2xl" bold dark>
          {t('Contributions')}
        </H1>
        <Contributions />
      </VStack>
    </HStack>
  )
}

const ProjectLeaderboardMobile = () => {
  const items: AnimatedNavBarItem[] = [
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
    <CardLayout dense noMobileBorder w="full" h="100%" paddingTop={standardPadding} marginBottom="120px">
      <HStack
        position="fixed"
        width="calc(100% - 24px)"
        top={`${dimensions.topNavBar.mobile.height + dimensions.projectNavBar.mobile.height - 1}px`}
        paddingTop={2}
        paddingBottom={1}
        bg="utils.pbg"
        paddingX={{ base: 0, lg: 6 }}
        zIndex={1}
      >
        <AnimatedNavBar {...animatedNavBarProps} showLabel />
      </HStack>
      <VStack paddingTop={`${dimensions.projectNavBar.mobile.height}px`}>{render && render()}</VStack>
    </CardLayout>
  )
}
