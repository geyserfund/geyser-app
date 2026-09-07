import { Button, VStack } from '@chakra-ui/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { Body } from '@/shared/components/typography/Body.tsx'
import { getPath } from '@/shared/constants/index.ts'
import { useLandingCircularGrantProjectsSectionQuery } from '@/types/index.ts'

import type { ProjectDisplayItem } from '../components/ProjectDisplayBody.tsx'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody.tsx'
import { ProjectRowLayout } from '../components/ProjectRowLayout.tsx'

export const CircularGrantProjects = () => {
  const { t } = useTranslation()
  const { data, error, loading, refetch } = useLandingCircularGrantProjectsSectionQuery()

  const projects = useMemo<ProjectDisplayItem[]>(
    () =>
      (data?.projectsGet.projects ?? []).map((project) => ({
        ...project,
        statusPillLabel: t('Circular Grant'),
      })),
    [data?.projectsGet.projects, t],
  )

  const title = t('Circular grant projects')

  if (loading) {
    return <ProjectDisplayBodySkeleton />
  }

  if (projects.length === 0) {
    if (error) {
      return (
        <ProjectRowLayout title={title} width="100%">
          <VStack alignItems="start" spacing={4} py={4}>
            <Body>{t('Failed to load projects')}</Body>
            <Button size="sm" variant="outline" colorScheme="neutral1" onClick={() => refetch()}>
              {t('Retry')}
            </Button>
          </VStack>
        </ProjectRowLayout>
      )
    }

    return null
  }

  return (
    <ProjectDisplayBody
      title={title}
      description={t('Support projects using debt-free capital that can return and fund the next local entrepreneur.')}
      projects={projects}
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryCircularGrantProjects')} />}
    />
  )
}
