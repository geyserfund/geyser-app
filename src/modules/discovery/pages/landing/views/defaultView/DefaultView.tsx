import { VStack } from '@chakra-ui/react'

import { Featured } from './sections/Featured'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek'
import { TagsBar } from './sections/TagsBar'
import { TrendingRewards } from './sections/TrendingRewards'
import { WelcomeCard } from './sections/WelcomeCard'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={6}>
      <TagsBar />
      <WelcomeCard />
      <VStack w="full" spacing={8}>
        <Featured />
        <TrendingRewards />
        <ProjectsDisplayMostFundedThisWeek />
      </VStack>
    </VStack>
  )
}
