import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

import { DiscoverMoreButton } from '@/modules/discovery/components/DiscoverMoreButton.tsx'
import { getPath } from '@/shared/constants/index.ts'

import {
  OrderByDirection,
  ProjectFundingStrategy,
  ProjectsGetWhereInput,
  ProjectsOrderByField,
  ProjectsOrderByInput,
  useGetUserIpCountryQuery,
  useProjectsForLandingPageQuery,
} from '../../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

const NO_OF_PROJECT_TO_LOAD = 6

export const ProjectsInYourRegion = () => {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(true)

  const { data: userIpCountryData } = useGetUserIpCountryQuery({
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
    skip: loading || !userIpCountryData?.userIpCountry,
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

  if (loading || loadingProjects) {
    return <ProjectDisplayBodySkeleton />
  }

  const ProjectByCategoryList = data?.projectsGet.projects || []

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
