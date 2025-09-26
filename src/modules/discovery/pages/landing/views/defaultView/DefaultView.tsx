import { Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { LandingBackdropWrapper } from '@/shared/components/display/LandingBackdropWrapper.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'

import { HeroesMainPage } from '../../../heroes/index.ts'
import { LandingPageSectionTitle } from './components/LandingPageSectionTitle.tsx'
import { TopProjects } from './components/TopProjects.tsx'
import { AonProjectsDisplayMostFundedThisWeek } from './sections/AonProjectsDisplayMostFundedThisWeek.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { Featured } from './sections/Featured'
import { JoinOurMailingList } from './sections/JoinOurMailingList.tsx'
import { JoinTheMovement } from './sections/JoinTheMovement.tsx'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek'
import { RecentImpactPosts } from './sections/RecentImpactPosts.tsx'
import { RecentLaunches } from './sections/RecentLaunches.tsx'
import { RecommendedForYou } from './sections/RecommendedForYou.tsx'
import { SubCategoriesBar } from './sections/SubCategoriesBar.tsx'
import { SuccessStories } from './sections/SuccessStories.tsx'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={10}>
      <SubCategoriesBar />

      <LandingBackdropWrapper width="auto">
        <Body dark size="3xl" bold>
          {t('Fund and Fuel Bitcoin Adoption Worldwide')}
        </Body>
      </LandingBackdropWrapper>
      <VStack w="full" spacing={20} paddingBottom={40}>
        <Stack direction={{ base: 'column', md: 'row' }} w="full" alignItems="start" spacing={{ base: 4, lg: 12 }}>
          <Featured />
          <RecommendedForYou />
        </Stack>

        <VStack w="full" alignItems="start">
          <LandingPageSectionTitle>{t('Trending')}</LandingPageSectionTitle>

          <LandingBackdropWrapper>
            <Body light size="xl" bold>
              {t('Discover the most funded all-or-nothing campaigns and fundraisers in Bitcoin')}
            </Body>
          </LandingBackdropWrapper>
        </VStack>

        <AonProjectsDisplayMostFundedThisWeek />

        {ProjectCategoryList.map((category) => (
          <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
        ))}
        <RecentLaunches />
        <CharityProjects />

        <VStack w="full" alignItems="start" spacing={8}>
          <LandingPageSectionTitle>{t('Celebrating the heroes of adoption')}</LandingPageSectionTitle>
          <HeroesMainPage />
          <TopProjects />
        </VStack>

        <VStack w="full" alignItems="start">
          <LandingPageSectionTitle>{t('See the impact')}</LandingPageSectionTitle>
          <LandingBackdropWrapper>
            <Body light size="xl" bold>
              {t('Projects on Geyser are having real impact. Explore what project creators are doing and have done.')}
            </Body>
          </LandingBackdropWrapper>
        </VStack>
        <RecentImpactPosts />

        <SuccessStories />

        <JoinTheMovement />

        <JoinOurMailingList />
      </VStack>
    </VStack>
  )
}
