import { Stack, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { TopProjects } from './components/TopProjects.tsx'
import { AonProjectsDisplayMostFundedThisWeek } from './sections/AonProjectsDisplayMostFundedThisWeek.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { Featured } from './sections/Featured.tsx'
import { JoinOurMailingList } from './sections/JoinOurMailingList.tsx'
import { JoinTheMovement } from './sections/JoinTheMovement.tsx'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek.tsx'
import { ProjectsInYourRegion } from './sections/ProjectsInYourRegion.tsx'
import { RecentImpactPosts } from './sections/RecentImpactPosts.tsx'
import { RecentLaunches } from './sections/RecentLaunches.tsx'
import { RecommendedForYou } from './sections/RecommendedForYou.tsx'
import { SuccessStories } from './sections/SuccessStories.tsx'
import { TiaProjectsDisplayMostFundedThisWeek } from './sections/TiaProjectsDisplayMostFundedThisWeek.tsx'
import { TitleBar } from './sections/TitleBar.tsx'

export const DefaultView = () => {
  const [showBelowTheFold, setShowBelowTheFold] = useState(false)

  useEffect(() => {
    /** Wait for initial content to render before showing below-the-fold content */
    const timer = setTimeout(() => {
      setShowBelowTheFold(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <VStack w="full" spacing={10} paddingTop="20px">
      <VStack w="full" spacing={20} paddingBottom={40}>
        <TitleBar />

        <Stack direction={{ base: 'column', md: 'row' }} w="full" alignItems="stretch" spacing={{ base: 4, lg: 12 }}>
          <Featured />
          <RecommendedForYou />
        </Stack>

        <SuccessStories />

        <AonProjectsDisplayMostFundedThisWeek />
        <TiaProjectsDisplayMostFundedThisWeek />
        <ProjectsInYourRegion />

        <RecentImpactPosts />

        {showBelowTheFold && (
          <>
            {ProjectCategoryList.map((category) => (
              <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
            ))}
            <RecentLaunches />
            <CharityProjects />

            <HeroesMainPage />

            <TopProjects />

            <JoinTheMovement />

            <JoinOurMailingList />
          </>
        )}
      </VStack>
    </VStack>
  )
}
