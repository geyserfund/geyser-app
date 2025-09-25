import { GridItem, SimpleGrid } from '@chakra-ui/react'
import { t } from 'i18next'

import { H3 } from '@/shared/components/typography/index.ts'
import { useProjectRecommendedGetQuery } from '@/types/index.ts'

import { LandingCardBaseSkeleton } from '../../../components/LandingCardBase.tsx'
import { LandingProjectCard } from '../../../components/LandingProjectCard.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const RecommendedForYou = () => {
  const { data, loading } = useProjectRecommendedGetQuery({
    variables: {
      input: {
        n: 4,
      },
    },
  })

  if (loading) {
    return null
  }

  const renderProjects = () => {
    if (loading) {
      return [...Array(4).keys()].map((key) => (
        <GridItem key={key}>
          <LandingCardBaseSkeleton />
        </GridItem>
      ))
    }

    return data?.projectRecommendedGet.map((project) => (
      <GridItem key={project.project.id}>
        <LandingProjectCard project={project.project} noMobile hideContributionContent />
      </GridItem>
    ))
  }

  return (
    <ProjectRowLayout
      title={
        <H3 size="xl" bold color="primary1.11" textTransform="uppercase">
          {t('Recommended for you')}
        </H3>
      }
      flex={1}
      width="100%"
    >
      <SimpleGrid width="100%" columns={{ base: 1, xs: 2 }} spacing={{ base: 4, lg: 8 }}>
        {renderProjects()}
      </SimpleGrid>
    </ProjectRowLayout>
  )
}
