import { GridItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { t } from 'i18next'
import { useMemo, useState } from 'react'

import { ProjectStatus, useProjectsForLaunchpadPageQuery } from '@/types/index.ts'

import { LaunchpadProjectItem, LaunchpadProjectItemSkeleton } from './components/LaunchpadProjectItem.tsx'
import { SortBy, TitleWithSort } from './components/TitleWithSort.tsx'

export const LaunchpadProjects = () => {
  const [sortBy, setSortBy] = useState<SortBy>(SortBy.PreLaunchDate)

  const where = {
    status: ProjectStatus.PreLaunch,
  }

  const { data, loading } = useProjectsForLaunchpadPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where,
      },
    },
  })

  const sortedProjects = useMemo(() => {
    const projects = data?.projectsGet.projects ? [...data.projectsGet.projects] : []

    return projects.sort((a, b) => {
      if (sortBy === SortBy.PreLaunchDate) {
        return (a.preLaunchedAt ?? 0) - (b.preLaunchedAt ?? 0)
      }

      return (b.followersCount ?? 0) - (a.followersCount ?? 0)
    })
  }, [data, sortBy])

  return (
    <VStack w="full" spacing={4}>
      <TitleWithSort title={t('Projects')} sortBy={sortBy} onSortByChange={(sortBy) => setSortBy(sortBy)} />

      <SimpleGrid w="full" columns={{ base: 1, lg: 4 }} spacingX="20px" spacingY="20px">
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
                  <LaunchpadProjectItem project={project} />
                </GridItem>
              )
            })}
      </SimpleGrid>
    </VStack>
  )
}
