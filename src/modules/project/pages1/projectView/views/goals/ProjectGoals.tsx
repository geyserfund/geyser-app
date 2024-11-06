import { VStack } from '@chakra-ui/react'

import { RenderGoals } from './common/RenderGoals'
import { CreatorGoalPageBottomBar, CreatorGoalPageTopBar } from './components'

export const ProjectGoals = () => {
  return (
    <VStack w="full" spacing={8} paddingBottom={28}>
      <CreatorGoalPageTopBar />
      <VStack w="full" alignItems={'start'}>
        <RenderGoals />
      </VStack>

      <CreatorGoalPageBottomBar />
    </VStack>
  )
}
