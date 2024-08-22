import { VStack } from '@chakra-ui/react'

import { Featured } from './sections/Featured'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek'
import { TagsBar } from './sections/TagsBar'
import { TrendingRewards } from './sections/TrendingRewards'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={6}>
      <TagsBar />
      <VStack w="full" spacing={8}>
        <Featured />
        <TrendingRewards />
        <ProjectsDisplayMostFundedThisWeek />
      </VStack>
    </VStack>
  )
}
