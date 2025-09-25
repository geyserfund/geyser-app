import { Stack, VStack } from '@chakra-ui/react'

import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'
import { ProjectSubCategory } from '@/types/index.ts'

import { TopProjects } from './components/TopProjects.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { Featured } from './sections/Featured'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek'
import { RecentLaunches } from './sections/RecentLaunches.tsx'
import { RecommendedForYou } from './sections/RecommendedForYou.tsx'
import { SubCategoriesBar } from './sections/SubCategoriesBar.tsx'
import { TrendingRewards } from './sections/TrendingRewards'
import { WelcomeCard } from './sections/WelcomeCard'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={6}>
      <SubCategoriesBar />
      <WelcomeCard />
      <VStack w="full" spacing={8}>
        <Stack direction={{ base: 'column', md: 'row' }} w="full" alignItems="start" spacing={{ base: 4, lg: 12 }}>
          <Featured />
          <RecommendedForYou />
        </Stack>

        <TrendingRewards />
        <ProjectsDisplayMostFundedThisWeek subCategory={ProjectSubCategory.CircularEconomy} />
        {ProjectCategoryList.map((category) => (
          <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
        ))}
        <RecentLaunches />
        <CharityProjects />

        <TopProjects />
      </VStack>
    </VStack>
  )
}
