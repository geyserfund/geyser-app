import { Box, Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { Body } from '@/shared/components/typography/Body.tsx'
import { LandingDescriptionBackdropUrl } from '@/shared/constants/index.ts'
import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'
import { ProjectSubCategory } from '@/types/index.ts'

import { LandingPageSectionTitle } from './components/LandingPageSectionTitle.tsx'
import { TopProjects } from './components/TopProjects.tsx'
import { AonProjectsDisplayMostFundedThisWeek } from './sections/AonProjectsDisplayMostFundedThisWeek.tsx'
import { CharityProjects } from './sections/CharityProjects.tsx'
import { Featured } from './sections/Featured'
import { ProjectsDisplayMostFundedThisWeek } from './sections/ProjectsDisplayMostFundedThisWeek'
import { RecentLaunches } from './sections/RecentLaunches.tsx'
import { RecommendedForYou } from './sections/RecommendedForYou.tsx'
import { SubCategoriesBar } from './sections/SubCategoriesBar.tsx'
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

        <VStack w="full" alignItems="start">
          <LandingPageSectionTitle>{t('Trending')}</LandingPageSectionTitle>
          <Box
            w="full"
            paddingX={6}
            paddingY={6}
            borderRadius="22px"
            backgroundImage={`linear-gradient(0deg, rgba(237, 255, 254, 0.33) 0%, rgba(237, 255, 254, 0.33) 100%), url(${LandingDescriptionBackdropUrl})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
            backgroundBlendMode="lighten"
            backgroundColor="rgba(255, 255, 255, 0.88)"
          >
            <Body light size="xl" bold>
              {t('Discover the most funded all-or-nothing campaigns and fundraisers in Bitcoin')}
            </Body>
          </Box>
        </VStack>

        <AonProjectsDisplayMostFundedThisWeek />

        <ProjectsDisplayMostFundedThisWeek subCategory={ProjectSubCategory.CircularEconomy} />
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
