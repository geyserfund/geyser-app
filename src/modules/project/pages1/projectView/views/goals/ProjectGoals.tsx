import { VStack } from '@chakra-ui/react'

import { CardLayout } from '@/shared/components/layouts'

import { RenderGoals } from './common/RenderGoals'
import { CreatorGoalPageBottomBar, CreatorGoalPageTopBar } from './components'

export const ProjectGoals = () => {
  return (
    <VStack w="full" spacing={8}>
      <CreatorGoalPageTopBar />
      <CardLayout w="full">
        <RenderGoals />
      </CardLayout>
      <CreatorGoalPageBottomBar />
    </VStack>
  )
}
