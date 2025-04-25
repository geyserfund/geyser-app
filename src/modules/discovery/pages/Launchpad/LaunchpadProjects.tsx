import { GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'

import { ProjectForLaunchpadPageFragment, ProjectStatus, useProjectsForLaunchpadPageQuery } from '@/types/index.ts'

import { LaunchpadProjectItem, LaunchpadProjectItemSkeleton } from './components/LaunchpadProjectItem.tsx'
import { SortBy, TitleWithSort } from './components/TitleWithSort.tsx'

export const LaunchpadProjects = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PreLaunchDate)

  const [projects, setProjects] = useState<ProjectForLaunchpadPageFragment[]>([])

  const where = {
    status: ProjectStatus.PreLaunch,
  }

  const { loading } = useProjectsForLaunchpadPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where,
      },
    },
    onCompleted(data) {
      const projects = data?.projectsGet.projects ? [...data.projectsGet.projects] : []
      setProjects(projects)
    },
  })

  const sortedProjects = useMemo(() => {
    return projects.sort((a, b) => {
      if (sortBy === SortBy.PreLaunchDate) {
        return (a.preLaunchedAt ?? 0) - (b.preLaunchedAt ?? 0)
      }

      if (sortBy === SortBy.Category) {
        return (a.category ?? '').localeCompare(b.category ?? '')
      }

      return (b.followersCount ?? 0) - (a.followersCount ?? 0)
    })
  }, [projects, sortBy])

  const onFollowCompleted = (projectId: string) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, followersCount: (project.followersCount ?? 0) + 1 } : project,
      ),
    )
  }

  return (
    <VStack w="full" spacing={4}>
      <TitleWithSort
        title={t('Projects in Launchpad')}
        sortBy={sortBy}
        onSortByChange={(sortBy) => setSortBy(sortBy)}
      />

      <SimpleGrid w="full" columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }} spacingX="20px" spacingY="20px">
        {loading
          ? [...Array(9).keys()].map((key) => {
              return (
                <GridItem key={key}>
                  <LaunchpadProjectItemSkeleton />
                </GridItem>
              )
            })
          : sortedProjects.map((project) => {
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
