import { GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'

import { useProjectRecommendedGetQuery } from '@/types/index.ts'

import { LandingCardBaseSkeleton } from '../../../../components/LandingCardBase.tsx'
import { LandingProjectCard } from '../../../../components/LandingProjectCard.tsx'
import { LandingPageSectionTitle } from '../components/LandingPageSectionTitle.tsx'

export const RecommendedForYou = () => {
  const { data, loading } = useProjectRecommendedGetQuery({
    variables: {
      input: {
        n: 4,
      },
    },
  })

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
        <LandingProjectCard project={project.project} noMobile />
      </GridItem>
    ))
  }

  return (
    <VStack alignItems="start" flex={1} spacing={5} width="100%">
      <LandingPageSectionTitle>{t('Recommended for you')}</LandingPageSectionTitle>
      <SimpleGrid
        width="100%"
        columns={{ base: 1, xs: 2 }}
        spacingX={{ base: 4, lg: 12 }}
        spacingY={{ base: 4, lg: 6 }}
      >
        {renderProjects()}
      </SimpleGrid>
    </VStack>
  )
}
