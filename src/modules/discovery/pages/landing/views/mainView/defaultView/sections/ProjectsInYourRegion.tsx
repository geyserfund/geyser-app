import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'

import type { ProjectDisplayItem } from '../components/ProjectDisplayBody'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

type ProjectsInYourRegionProps = {
  loading: boolean
  projects?: ProjectDisplayItem[]
}

export const ProjectsInYourRegion = ({
  loading: providedLoading,
  projects: providedProjects,
}: ProjectsInYourRegionProps) => {
  const { t } = useTranslation()
  if (providedLoading) {
    return <ProjectDisplayBodySkeleton />
  }

  const projectByCategoryList = providedProjects ?? []

  if (projectByCategoryList.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={t('Projects in your region ')}
      projects={projectByCategoryList}
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryFundraisersInYourRegion')} />}
    />
  )
}
