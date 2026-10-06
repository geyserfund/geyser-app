import { Button, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import type { ProjectsGetWhereInput } from '@/types/index.ts'
import { ProjectsGetWhereInputStatus, useLandingCircularGrantsByFilterQuery } from '@/types/index.ts'

import type { ProjectDisplayItem } from '../components/ProjectDisplayBody.tsx'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

type CircularGrantProjectsProps = {
  title?: string
  description?: string
  where?: ProjectsGetWhereInput
  take?: number
  includeSuccessful?: boolean
  emptyStateText?: string
  showDiscoverMore?: boolean
}

type CircularGrantProjectsQueryOptions = Pick<CircularGrantProjectsProps, 'where' | 'take' | 'includeSuccessful'>

/**
 * Builds the query variables for a Circular Grant project row.
 * Exported so callers can prefetch a filter with exactly the variables the row will request.
 */
export const getCircularGrantProjectsQueryVariables = ({
  where,
  take = 3,
  includeSuccessful = false,
}: CircularGrantProjectsQueryOptions) => {
  const baseWhere = {
    isCircularGrant: true,
    ...where,
  }

  return {
    ongoing: {
      take,
      where: {
        ...(includeSuccessful
          ? baseWhere
          : { ...baseWhere, ...(!where?.statuses && { status: ProjectsGetWhereInputStatus.Active }) }),
        ...(includeSuccessful ? { status: ProjectsGetWhereInputStatus.Active } : {}),
      },
    },
    successful: {
      take,
      where: {
        ...baseWhere,
        goalReached: true,
        statuses: [ProjectsGetWhereInputStatus.Active, ProjectsGetWhereInputStatus.Closed],
      },
    },
  }
}

export const CircularGrantProjects = ({
  title = 'Circular Grants',
  description = 'Back vetted local projects with reusable, debt-free capital that can return to the next local entrepreneur.',
  where,
  take = 3,
  includeSuccessful = false,
  emptyStateText,
  showDiscoverMore = true,
}: CircularGrantProjectsProps) => {
  const { t } = useTranslation()
  const variables = getCircularGrantProjectsQueryVariables({ where, take, includeSuccessful })
  const ongoingQuery = useLandingCircularGrantsByFilterQuery({ variables: variables.ongoing })
  const successfulQuery = useLandingCircularGrantsByFilterQuery({
    skip: !includeSuccessful,
    variables: variables.successful,
  })

  const loading = ongoingQuery.loading || (includeSuccessful && successfulQuery.loading)
  const error = ongoingQuery.error || successfulQuery.error
  const refetch = () => {
    ongoingQuery.refetch()
    if (includeSuccessful) {
      successfulQuery.refetch()
    }
  }

  const projects = useMemo<ProjectDisplayItem[]>(
    () =>
      [
        ...(ongoingQuery.data?.projectsGet.projects ?? []),
        ...(includeSuccessful ? successfulQuery.data?.projectsGet.projects ?? [] : []),
      ]
        .filter(
          (project, index, allProjects) => allProjects.findIndex((candidate) => candidate.id === project.id) === index,
        )
        .slice(0, take)
        .map((project) => ({
          ...project,
          statusPillLabel: t('Circular Grant'),
        })),
    [includeSuccessful, ongoingQuery.data?.projectsGet.projects, successfulQuery.data?.projectsGet.projects, t, take],
  )

  const sectionTitle = t(title)
  const discoverMoreButton = showDiscoverMore ? (
    <DiscoverMoreButton as={Link} to={getPath('discoveryCircularGrantProjects')} />
  ) : undefined

  // Only show placeholders when there is nothing to show yet; cached or prefetched results render straight away.
  if (loading && projects.length === 0) {
    return <ProjectDisplayBodySkeleton title={sectionTitle} count={take} rightContent={discoverMoreButton} />
  }

  if (projects.length === 0) {
    if (error) {
      return (
        <ProjectRowLayout title={sectionTitle} width="100%" rightContent={discoverMoreButton}>
          <VStack alignItems="start" spacing={4} py={4}>
            <Body light>{t('Failed to load projects')}</Body>
            <Button size="md" variant="outline" colorScheme="neutral1" onClick={refetch}>
              {t('Retry')}
            </Button>
          </VStack>
        </ProjectRowLayout>
      )
    }

    if (emptyStateText) {
      return (
        <ProjectRowLayout title={sectionTitle} width="100%" rightContent={discoverMoreButton}>
          <Body light>{t(emptyStateText)}</Body>
        </ProjectRowLayout>
      )
    }

    return null
  }

  return (
    <ProjectDisplayBody
      title={sectionTitle}
      description={t(description)}
      projects={projects}
      rightContent={discoverMoreButton}
    />
  )
}
