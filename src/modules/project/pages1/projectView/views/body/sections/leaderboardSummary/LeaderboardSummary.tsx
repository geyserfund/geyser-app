import { HStack, useDisclosure } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts'
import { AnimatedNavBar, NavBarItems } from '@/shared/components/navigation/AnimatedNavBar'

import { Contributions } from './components/Contributions'
import { Leaderboard } from './components/Leaderboard'

export const LeaderboardSummary = () => {
  const { isOpen: isContribution, onOpen: goToContributions, onClose: goToLeaderboard } = useDisclosure()

  const items = [
    {
      name: 'Leaderboard',
      onClick: goToLeaderboard,
    },
    {
      name: 'Contributions',
      onClick: goToContributions,
    },
  ] as NavBarItems[]

  const activeItem = isContribution ? 1 : 0

  return (
    <CardLayout w="full" flex={1} dense py={6}>
      <HStack w="full" px={6}>
        <AnimatedNavBar items={items} activeItem={activeItem} showLabel />
      </HStack>
      {isContribution ? <Contributions /> : <Leaderboard />}
    </CardLayout>
  )
}
