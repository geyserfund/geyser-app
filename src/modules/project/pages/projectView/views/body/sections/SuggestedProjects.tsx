import { Button, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router'

import { LandingProjectCard } from '@/modules/discovery/pages/landing/components/LandingProjectCard.tsx'
import { CardLayoutProps } from '@/shared/components/layouts/CardLayout.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath, getPathWithGeyserPromotionsHero } from '@/shared/constants/index.ts'
import { ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import {
  ProjectsMostFundedByCategoryRange,
  ProjectSubCategory,
  useProjectsMostFundedByCategoryQuery,
} from '@/types/index.ts'

type SuggestedProjectsProps = {
  id?: string
  subCategory?: ProjectSubCategory | null
  projectId?: string | null
} & CardLayoutProps

const NO_OF_PROJECTS_TO_TAKE = 15
const NO_OF_PROJECTS_TO_SHOW = 3

export const SuggestedProjects = ({ subCategory, projectId, id, ...rest }: SuggestedProjectsProps) => {
  const { data, loading } = useProjectsMostFundedByCategoryQuery({
    skip: !subCategory,
    variables: {
      input: {
        range: ProjectsMostFundedByCategoryRange.Week,
        subCategory,
        take: NO_OF_PROJECTS_TO_TAKE,
      },
    },
  })

  const projects =
    data?.projectsMostFundedByCategory[0]?.projects
      .map((project) => project.project)
      .filter((project) => project.id !== projectId) || []

  if (loading || !subCategory || projects.length === 0) {
    return null
  }

  const suggestedProjects = projects.slice(0, NO_OF_PROJECTS_TO_SHOW)

  return (
    <VStack w="full" paddingTop={16} paddingBottom={16} {...rest}>
      <VStack w="full" spacing={4}>
        <HStack w="full" justifyContent="space-between" alignItems="flex-start">
          <H3 size="xl" bold>
            {t('Similar projects in')}{' '}
            <Body as="span" bold color="primary1.9">
              {ProjectSubCategoryLabel[subCategory]}
            </Body>
          </H3>
          <Button
            as={Link}
            to={getPath('landingPage')}
            state={{
              filter: {
                subCategory,
              },
            }}
            variant="outline"
            size="md"
            colorScheme="neutral1"
          >
            {t('See all')}
          </Button>
        </HStack>
        <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacing={{ base: 4, lg: 8 }}>
          {suggestedProjects.map((project) => {
            return (
              <GridItem key={project.id}>
                <LandingProjectCard
                  id={id}
                  project={project}
                  to={getPathWithGeyserPromotionsHero('project', project.name)}
                />
              </GridItem>
            )
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  )
}
