import { Box, GridItem } from '@chakra-ui/react'
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

import { LaunchpadProjectItem, LaunchpadProjectItemSkeleton } from './LaunchpadProjectItem.tsx'

type LaunchpadProjectsByCategoryProps = {
  category?: ProjectCategory
  subCategory?: ProjectSubCategory
}

export const LaunchpadProjectsByCategory = ({ category, subCategory }: LaunchpadProjectsByCategoryProps) => {
  const [projects, setProjects] = useState<ProjectForLaunchpadPageFragment[]>([])

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
      return (b.balanceUsdCent ?? 0) - (a.balanceUsdCent ?? 0)
    })
  }, [projects])

  const projectsToShow = sortedProjects

  if (projectsToShow.length === 0) {
    return null
  }

  return (
    <>
      {loading
        ? [...Array(4).keys()].map((key) => {
            return (
              <GridItem key={key}>
                <LaunchpadProjectItemSkeleton />
              </GridItem>
            )
          })
        : projectsToShow.map((project, index) => {
            const isFirst = index === 0
            return (
              <GridItem key={project.id} overflow="visible">
                <Box height={{ base: '32px', md: '40px' }} marginBottom={2} overflow="visible">
                  <H3 size={{ base: 'lg', md: '2xl' }} medium dark whiteSpace="nowrap">
                    {isFirst ? (
                      <>
                        {t('New in')}{' '}
                        <Body as="span" bold color="primary1.11">
                          {category ? ProjectCategoryLabel[category] : ProjectSubCategoryLabel[subCategory ?? '']}
                        </Body>
                      </>
                    ) : (
                      ''
                    )}
                  </H3>
                </Box>

                <LaunchpadProjectItem project={project} />
              </GridItem>
            )
          })}
    </>
  )
}
