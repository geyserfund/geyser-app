import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'

import {
  OrderByDirection,
  ProjectFundingStrategy,
  ProjectsGetWhereInput,
  ProjectsGetWhereInputStatus,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  useGetUserIpCountryQuery,
  useProjectsForLandingPageQuery,
} from '../../../../../../../../types'
import type { ProjectDisplayItem } from '../components/ProjectDisplayBody'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

const NO_OF_PROJECT_TO_LOAD = 6

type ProjectsInYourRegionProps = {
  loading?: boolean
  projects?: ProjectDisplayItem[]
}

export const ProjectsInYourRegion = ({
  loading: providedLoading,
  projects: providedProjects,
}: ProjectsInYourRegionProps) => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)
  const hasProvidedProjects = providedProjects !== undefined || providedLoading !== undefined

  const { data: userIpCountryData } = useGetUserIpCountryQuery({
    skip: hasProvidedProjects,
    onCompleted() {
      setLoading(false)
    },
    onError() {
      setLoading(false)
    },
  })

  const where = {
    fundingStrategy: ProjectFundingStrategy.TakeItAll,
    countryCode: userIpCountryData?.userIpCountry || undefined,
    status: ProjectsGetWhereInputStatus.Active,
  } as ProjectsGetWhereInput

  const orderBy = [
    {
      direction: OrderByDirection.Desc,
      field: ProjectsOrderByField.LaunchedAt,
    },
    {
      field: ProjectsOrderByField.Balance,
      direction: OrderByDirection.Desc,
    },
  ] as ProjectsOrderByInput[]

  const { data, loading: loadingProjects } = useProjectsForLandingPageQuery({
    skip: hasProvidedProjects || loading || !userIpCountryData?.userIpCountry,
    variables: {
      input: {
        where,
        orderBy,
        pagination: {
          take: NO_OF_PROJECT_TO_LOAD,
        },
      },
    },
  })

  if (providedLoading || (!hasProvidedProjects && loading) || loadingProjects) {
    return <ProjectDisplayBodySkeleton />
  }

  const ProjectByCategoryList = providedProjects ?? data?.projectsGet.projects ?? []

  if (ProjectByCategoryList.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={t('Projects in your region ')}
      projects={ProjectByCategoryList}
      rightContent={<DiscoverMoreButton as={Link} to={getPath('discoveryFundraisersInYourRegion')} />}
    />
  )
}
