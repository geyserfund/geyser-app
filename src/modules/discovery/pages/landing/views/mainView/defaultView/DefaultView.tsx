import { Box, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Head } from '@/config/Head.tsx'
import { GeyserMainSeoImageUrl } from '@/shared/constants/index.ts'
import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'

import { HeroesMainPage } from '../../../../heroes/index.ts'
import { TopProjects } from './components/TopProjects.tsx'
import { AnnouncementBanner } from './sections/AnnouncementBanner.tsx'
import { CommunityHero } from './sections/CommunityHero.tsx'
import { AonProjectsDisplayMostFundedThisWeek } from './sections/AonProjectsDisplayMostFundedThisWeek.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { CuratedProjects } from './sections/CuratedProjects.tsx'
import { Hero } from './sections/Hero.tsx'
import { JoinTheMovement } from './sections/JoinTheMovement.tsx'
import { NewsletterSignup } from './sections/NewsletterSignup.tsx'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek.tsx'
import { ProjectsInYourRegion } from './sections/ProjectsInYourRegion.tsx'
import { RecentImpactPosts } from './sections/RecentImpactPosts.tsx'
import { RecentLaunches } from './sections/RecentLaunches.tsx'
import { SuccessStories } from './sections/SuccessStories.tsx'

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
    <VStack w="full" spacing={10} paddingTop={{ base: '4px', lg: '6px' }}>
      <Head image={GeyserMainSeoImageUrl} />
      <VStack w="full" spacing={20} paddingBottom={40}>
        <AnnouncementBanner mt={{ base: -4, md: -6 }} mb={{ base: 0, md: 0 }} />

        <Hero marginTop={-14} marginBottom={-14} />

        <CuratedProjects />

        <SuccessStories />

        <Box marginTop={-10} w="full">
          <AonProjectsDisplayMostFundedThisWeek />
        </Box>
        <Box marginTop={-10} w="full">
          <ProjectsInYourRegion />
        </Box>

        <Box marginTop={-10} w="full">
          <CommunityHero />
        </Box>

        <NewsletterSignup marginTop={-10} marginBottom={-10} />

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
          </>
        )}
      </VStack>
    </VStack>
  )
}
