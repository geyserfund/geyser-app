import { GridItem, SimpleGrid } from '@chakra-ui/react'

import { ProjectCategory, ProjectStatus, ProjectSubCategory, useProjectsForLaunchpadPageQuery } from '@/types/index.ts'

import { LaunchpadProjectItemSkeleton } from './LaunchpadProjectItem.tsx'
import { LaunchpadProjectsByCategory } from './LaunchpadProjectsByCategory.tsx'

const listOfItemsToShow = [
  {
    subCategory: ProjectSubCategory.CircularEconomy,
  },
  {
    category: ProjectCategory.Tool,
  },
  {
    category: ProjectCategory.Education,
  },
  {
    category: ProjectCategory.Culture,
  },
  {
    category: ProjectCategory.Community,
  },
  {
    category: ProjectCategory.Advocacy,
  },
  {
    category: ProjectCategory.Cause,
  },
  {
    category: ProjectCategory.Other,
  },
]

export const LaunchpadProjects = () => {
  const { data, loading } = useProjectsForLaunchpadPageQuery({
    fetchPolicy: 'network-only',
    variables: {
      input: {
        where: {
          status: ProjectStatus.PreLaunch,
        },
      },
    },
  })

  const projects = data?.projectsGet.projects ? [...data.projectsGet.projects] : []

  const projectsByCategory = listOfItemsToShow.map((item) => ({
    ...item,
    projects: projects.filter(
      (project) =>
        (item.category && project.category === item.category) ||
        (item.subCategory && project.subCategory === item.subCategory),
    ),
  }))

  return (
    <SimpleGrid w="full" columns={{ base: 1, sm: 2, md: 3, lg: 3, xl: 4 }} spacingX="20px" spacingY="20px">
      {loading
        ? [...Array(4).keys()].map((key) => {
            return (
              <GridItem key={key}>
                <LaunchpadProjectItemSkeleton />
              </GridItem>
            )
          })
        : projectsByCategory.map((item, index) => {
            if (item.projects.length === 0) {
              return null
            }

            return (
              <LaunchpadProjectsByCategory
                key={index}
                category={item.category}
                subCategory={item.subCategory}
                projects={item.projects}
              />
            )
          })}
    </SimpleGrid>
  )
}
