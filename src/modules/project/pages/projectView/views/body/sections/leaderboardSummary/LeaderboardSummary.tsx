import { HStack, StackProps } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts/CardLayout'
import { AnimatedNavBar, AnimatedNavBarItem } from '@/shared/components/navigation/AnimatedNavBar'
import { useAnimatedNavBar } from '@/shared/components/navigation/useAnimatedNavBar'

import { Contributions } from './views/Contributions.tsx'
import { Leaderboard } from './views/Leaderboard.tsx'

type LeaderboardSummaryProps = StackProps

export const LeaderboardSummary = ({ ...props }: LeaderboardSummaryProps) => {
  const items = [
    {
      name: 'Contributions',
      key: 'contributions',
      render: () => <Contributions />,
    },
    {
      name: 'Leaderboard',
      key: 'leaderboard',
      render: () => <Leaderboard />,
    },
  ] as AnimatedNavBarItem[]

  const { render, ...animatedNavbarProps } = useAnimatedNavBar({ items, defaultView: 'contributions' })

  return (
    <CardLayout w="full" flex={1} dense py={6} minHeight="320px" {...props}>
      <HStack w="full" px={6}>
        <AnimatedNavBar {...animatedNavbarProps} showLabel />
      </HStack>
      {render && render()}
    </CardLayout>
  )
}
