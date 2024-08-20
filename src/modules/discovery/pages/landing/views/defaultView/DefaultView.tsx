import { VStack } from '@chakra-ui/react'
import { useMemo } from 'react'

import { getListOfTags } from '@/shared/constants'

import { Featured } from './sections/Featured'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek'
import { TagsBar } from './sections/TagsBar'
import { TrendingRewards } from './sections/TrendingRewards'

export const DefaultView = () => {
  const allTags = useMemo(() => getListOfTags(), [])

  const firstThreeTags = allTags.slice(0, 3)
  const restOfTheTags = allTags.slice(3)
  return (
    <VStack w="full" spacing={6}>
      <TagsBar />
      <VStack w="full" spacing={8}>
        <Featured />
        <TrendingRewards />
        {firstThreeTags.map((tag) => (
          <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
        ))}
        {restOfTheTags.map((tag, index) => (
          <ProjectsDisplayMostFundedThisWeek key={tag.id} tag={tag} />
        ))}
      </VStack>
    </VStack>
  )
}
