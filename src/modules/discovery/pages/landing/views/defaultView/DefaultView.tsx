import { Stack, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectCategoryList } from '@/shared/constants/platform/projectCategory.ts'

import { HeroesMainPage } from '../../../heroes/index.ts'
import { ProjectRowLayout } from './components/ProjectRowLayout.tsx'
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
import { TiaProjectsDisplayMostFundedThisWeek } from './sections/TiaProjectsDisplayMostFundedThisWeek.tsx'

export const DefaultView = () => {
  return (
    <VStack w="full" spacing={10} paddingTop="20px">
      {/* <Body dark size="3xl" bold>
        {t('Fund and Fuel Bitcoin Adoption Worldwide')}
      </Body> */}

      <VStack w="full" spacing={20} paddingBottom={40}>
        <Stack direction={{ base: 'column', md: 'row' }} w="full" alignItems="start" spacing={{ base: 4, lg: 12 }}>
          <Featured />
          <RecommendedForYou />
        </Stack>

        <AonProjectsDisplayMostFundedThisWeek />
        <TiaProjectsDisplayMostFundedThisWeek />

        <ProjectRowLayout
          title={t("What's happening")}
          subtitle={t('Discover the latest activity')}
          width="100%"
          rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryActivity')} />}
        >
          <RecentImpactPosts />
        </ProjectRowLayout>

        {ProjectCategoryList.map((category) => (
          <ProjectsDisplayMostFundedThisWeek key={category} category={category} />
        ))}
        <RecentLaunches />
        <CharityProjects />

        <HeroesMainPage />

        <TopProjects />

        {/* <SuccessStories /> */}

        <JoinTheMovement />

        <JoinOurMailingList />
      </VStack>
    </VStack>
  )
}
