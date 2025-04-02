import { Button, Divider, GridItem, HStack, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { Link } from 'react-router-dom'

import { LandingProjectCard } from '@/modules/discovery/pages/landing/components/LandingProjectCard.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { H3 } from '@/shared/components/typography/Heading.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import { ProjectForLandingPageFragment, ProjectSubCategory, useProjectsForLandingPageQuery } from '@/types/index.ts'

type SuggestedProjectsProps = {
  subCategory?: ProjectSubCategory | null
  projectId?: string | null
}

export const SuggestedProjects = ({ subCategory, projectId }: SuggestedProjectsProps) => {
  const { data, loading } = useProjectsForLandingPageQuery({
    skip: !subCategory,
    variables: {
      input: {
        pagination: {
          take: 15,
        },
        where: {
          subCategory,
        },
      },
    },
  })

  const projects = data?.projectsGet.projects.filter((project) => project.id !== projectId) || []

  const suggestedProjects = getRandomProjects(projects)

  if (loading || !subCategory) {
    return null
  }

  return (
    <VStack w="full" paddingTop={12}>
      <VStack w="full" spacing={4}>
        <HStack w="full" justifyContent="space-between" alignItems="flex-start">
          <H3 size="xl" medium>
            {t('Similar projects in')}{' '}
            <Body as="span" medium color="primary1.9">
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
        <SimpleGrid w="full" columns={{ base: 1, lg: 3 }} spacingX="20px" spacingY="20px">
          {suggestedProjects.map((project) => {
            return (
              <GridItem key={project.id}>
                <LandingProjectCard project={project} />
              </GridItem>
            )
          })}
        </SimpleGrid>
      </VStack>
    </VStack>
  )
}

const getRandomProjects = (allProjects: ProjectForLandingPageFragment[]): ProjectForLandingPageFragment[] => {
  // Return empty array if allProjects is undefined or null
  if (!allProjects) return []

  // Clone the array to avoid modifying the original
  const projectsCopy = [...allProjects]
  // Create array for random selection
  const randomProjects: ProjectForLandingPageFragment[] = []

  // Get up to 3 random projects (or fewer if less than 3 exist)
  const selectionCount = Math.min(3, projectsCopy.length)

  for (let i = 0; i < selectionCount; i++) {
    // Get random index from remaining projects
    const randomIndex = Math.floor(Math.random() * projectsCopy.length)
    // Add to random selection and remove from copy to avoid duplicates
    randomProjects.push(projectsCopy[randomIndex] as ProjectForLandingPageFragment)
    projectsCopy.splice(randomIndex, 1)
  }

  return randomProjects
}
