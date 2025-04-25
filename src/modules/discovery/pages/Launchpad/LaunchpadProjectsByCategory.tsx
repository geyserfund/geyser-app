import { Button, GridItem, HStack, SimpleGrid, useDisclosure, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'

import { Body, H3 } from '@/shared/components/typography/index.ts'
import { ProjectCategoryLabel, ProjectSubCategoryLabel } from '@/shared/constants/platform/projectCategory.ts'
import {
  ProjectCategory,
  ProjectForLaunchpadPageFragment,
  ProjectStatus,
  ProjectSubCategory,
  useProjectsForLaunchpadPageQuery,
} from '@/types/index.ts'

import { LaunchpadProjectItem, LaunchpadProjectItemSkeleton } from './components/LaunchpadProjectItem.tsx'

type LaunchpadProjectsByCategoryProps = {
  category?: ProjectCategory
  subCategory?: ProjectSubCategory
}

export const LaunchpadProjectsByCategory = ({ category, subCategory }: LaunchpadProjectsByCategoryProps) => {
  const [projects, setProjects] = useState<ProjectForLaunchpadPageFragment[]>([])

  const { isOpen: isSeeAll, onOpen: onSeeAll } = useDisclosure()

  const { loading } = useProjectsForLaunchpadPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where: {
          status: ProjectStatus.PreLaunch,
          ...(category && { category }),
          ...(subCategory && { subCategory }),
        },
      },
    },
    onCompleted(data) {
      const projects = data?.projectsGet.projects ? [...data.projectsGet.projects] : []
      setProjects(projects)
    },
  })

  const sortedProjects = useMemo(() => {
    return projects.sort((a, b) => {
      return (b.followersCount ?? 0) - (a.followersCount ?? 0)
    })
  }, [projects])

  const onFollowCompleted = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, followersCount: (project.followersCount ?? 0) + 1 } : project,
      ),
    )
  }

  const hadMoreThan4Projects = sortedProjects.length > 4

  const projectsToShow = isSeeAll ? sortedProjects : hadMoreThan4Projects ? sortedProjects.slice(0, 4) : sortedProjects

  if (projectsToShow.length === 0) {
    return null
  }

  return (
    <VStack w="full" spacing={2}>
      <HStack justifyContent={'space-between'} width="100%">
        <H3 size="2xl" medium dark>
          {t('Trending in')}{' '}
          <Body as="span" bold color="primary1.11">
            {category ? ProjectCategoryLabel[category] : ProjectSubCategoryLabel[subCategory ?? '']}
          </Body>
        </H3>

        {!isSeeAll && hadMoreThan4Projects && (
          <Button variant={'outline'} onClick={onSeeAll}>
            {t('See all')}
          </Button>
        )}
      </HStack>

      <SimpleGrid w="full" columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }} spacingX="20px" spacingY="20px">
        {loading
          ? [...Array(4).keys()].map((key) => {
              return (
                <GridItem key={key}>
                  <LaunchpadProjectItemSkeleton />
                </GridItem>
              )
            })
          : projectsToShow.map((project) => {
              return (
                <GridItem key={project.id}>
                  <LaunchpadProjectItem project={project} onFollowCompleted={onFollowCompleted} />
                </GridItem>
              )
            })}
      </SimpleGrid>
    </VStack>
  )
}
