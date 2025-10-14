import { Stack, VStack } from '@chakra-ui/react'

import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { TopProjects } from './components/TopProjects.tsx'
import { AonProjectsDisplayMostFundedThisWeek } from './sections/AonProjectsDisplayMostFundedThisWeek.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { Featured } from './sections/Featured.tsx'
import { JoinOurMailingList } from './sections/JoinOurMailingList.tsx'
import { JoinTheMovement } from './sections/JoinTheMovement.tsx'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek.tsx'
import { RecentImpactPosts } from './sections/RecentImpactPosts.tsx'
import { RecentLaunches } from './sections/RecentLaunches.tsx'
import { RecommendedForYou } from './sections/RecommendedForYou.tsx'
import { TiaProjectsDisplayMostFundedThisWeek } from './sections/TiaProjectsDisplayMostFundedThisWeek.tsx'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={10} paddingTop="20px">
      <VStack w="full" spacing={20} paddingBottom={40}>
        <Stack direction={{ base: 'column', md: 'row' }} w="full" alignItems="stretch" spacing={{ base: 4, lg: 12 }}>
          <Featured />
          <RecommendedForYou />
        </Stack>

        <AonProjectsDisplayMostFundedThisWeek />
        <TiaProjectsDisplayMostFundedThisWeek />

        <RecentImpactPosts />

        {ProjectCategoryList.map((category) => (
          <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
        ))}
        <RecentLaunches />
        <CharityProjects />

        <HeroesMainPage />

        <TopProjects />

        <JoinTheMovement />

        <JoinOurMailingList />
      </VStack>
    </VStack>
  )
}
