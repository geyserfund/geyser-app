import { VStack } from '@chakra-ui/react'

import { ProjectCategoryList, ProjectSubCategory } from '@/shared/constants/platform/projectCategory.ts'

import { Featured } from './sections/Featured'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek'
import { SubCategoriesBar } from './sections/SubCategoriesBar.tsx'
import { TrendingRewards } from './sections/TrendingRewards'
import { WelcomeCard } from './sections/WelcomeCard'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={6}>
      <SubCategoriesBar />
      <WelcomeCard />
      <VStack w="full" spacing={8}>
        <Featured />
        <TrendingRewards />
        <ProjectsDisplayMostFundedThisWeek subCategory={ProjectSubCategory.circularEconomy} />
        {ProjectCategoryList.map((category) => (
          <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
        ))}
      </VStack>
    </VStack>
  )
}
