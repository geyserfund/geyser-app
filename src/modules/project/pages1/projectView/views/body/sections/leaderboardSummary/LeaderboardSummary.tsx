import { HStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'

import { Contributions } from './components/Contributions'
import { Leaderboard } from './components/Leaderboard'

export const LeaderboardSummary = () => {
  const items = [
    {
      name: 'Leaderboard',
      key: 'leaderboard',
      render: () => <Leaderboard />,
    },
    {
      name: 'Contributions',
      key: 'contributions',
      render: () => <Contributions />,
    },
  ] as AnimatedNavBarItem[]

  const { render, ...animatedNavbarProps } = useAnimatedNavBar({ items, defaultView: 'leaderboard' })

  return (
    <CardLayout w="full" flex={1} dense py={6} minHeight="320px">
      <HStack w="full" px={6}>
        <AnimatedNavBar {...animatedNavbarProps} showLabel />
      </HStack>
      {render && render()}
    </CardLayout>
  )
}
