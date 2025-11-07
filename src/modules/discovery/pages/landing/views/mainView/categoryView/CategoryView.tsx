import { Button, HStack, Icon, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { PiHouse } from 'react-icons/pi'
import { Link, Navigate, useParams } from 'react-router'

import { CardLayout } from '@/shared/components/layouts/CardLayout.tsx'
import { H1 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { LeaderboardPeriod, ProjectCategory, useLeaderboardGlobalProjectsQuery } from '@/types/index.ts'

import { ProjectHeroDisplay, ProjectHeroDisplaySkeleton } from '../../../components/ProjectHeroDisplay.tsx'
import { ProjectRowLayout } from '../defaultView/components/ProjectRowLayout.tsx'
import { ProjectsDisplayMostFundedThisWeek } from '../defaultView/sections/ProjectsDisplayMostFundedThisWeek.tsx'
import { PaginatedView } from '../paginatedView/PaginatedView.tsx'

export const CategoryView = () => {
  const { category } = useParams<{ category: string }>()

  if (!category) {
    return <Navigate to={getPath('discoveryLanding')} />
  }

  return (
    <VStack w="full" alignItems="flex-start" spacing={16}>
      <HStack w="full" justifyContent="space-between">
        <H1 size="3xl" bold>
          {category}
        </H1>
        <Button as={Link} to={getPath('discoveryLanding')} variant="outline" leftIcon={<Icon as={PiHouse} />}>
          {t('back home')}
        </Button>
      </HStack>

      <TopProjectsInCategory category={category} />
      <ProjectsDisplayMostFundedThisWeek
        key={category}
        category={category as ProjectCategory}
        title={t('Trending')}
        noRightContent
      />
      <ProjectRowLayout title={'Must funded projects'} width="100%">
        <PaginatedView noTitle />
      </ProjectRowLayout>
    </VStack>
  )
}

const MAX_PROJECTS = 12

const TopProjectsInCategory = ({ category }: { category?: string }) => {
  const { loading, data } = useLeaderboardGlobalProjectsQuery({
    variables: { input: { period: LeaderboardPeriod.Month, top: MAX_PROJECTS, category } },
  })

  const projects = data?.leaderboardGlobalProjectsGet || []

  if (projects.length === 0 && !loading) return null

  return (
    <ProjectRowLayout title={t('Top Projects this month')} width="100%">
      <CardLayout w="full" direction="row" flexWrap={'wrap'}>
        {loading
          ? [...Array(MAX_PROJECTS).keys()].map((key) => {
              return <ProjectHeroDisplaySkeleton key={key} />
            })
          : projects.map((project, index) => {
              return <ProjectHeroDisplay key={project.projectName} project={project} index={index} />
            })}
      </CardLayout>
    </ProjectRowLayout>
  )
}
