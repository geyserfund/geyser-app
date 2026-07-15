import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchCharityProjectsData } from '@/api/airtable.ts'

import { ProjectCategory, ProjectSubCategory, useProjectsForLandingPageQuery } from '../../../../../../../../types'
import type { ProjectDisplayItem } from '../components/ProjectDisplayBody'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

interface ProjectDisplayProps {
  category?: ProjectCategory
  subCategory?: ProjectSubCategory
  loading?: boolean
  projects?: ProjectDisplayItem[]
}

type AirtableResponse = {
  records: Array<{
    id: string
    createdTime: string
    fields: CharityProjects
  }>
}

type CharityProjects = {
  id: number
  projectname: string
  projectId: number
}

export const CharityProjects = ({
  category,
  subCategory,
  loading: providedLoading,
  projects: providedProjects,
}: ProjectDisplayProps) => {
  const { t } = useTranslation()
  const hasProvidedProjects = providedProjects !== undefined || providedLoading !== undefined

  const [projectList, setProjectList] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (hasProvidedProjects) {
      return
    }

    setIsLoading(true)
    fetchCharityProjectsData().then((data: AirtableResponse) => {
      // Transform the Airtable response to our FeaturedWallet format
      const projects = data.records.map((record) => ({
        ...record.fields,
      }))

      const projectIds =
        projects.length > 6
          ? projects
              .sort(() => Math.random() - 0.5)
              .slice(0, 6)
              .map((project) => project.projectId)
          : projects.map((project) => project.projectId)

      setProjectList(projectIds)
      setIsLoading(false)
    })
  }, [hasProvidedProjects])

  const { loading, data } = useProjectsForLandingPageQuery({
    skip: hasProvidedProjects || isLoading || projectList.length === 0,
    variables: {
      input: {
        where: {
          ids: projectList,
        },
      },
    },
  })

  if (providedLoading || loading || isLoading) {
    return <ProjectDisplayBodySkeleton />
  }

  const projects = providedProjects ?? data?.projectsGet.projects ?? []

  if (projects.length === 0) {
    return null
  }

  return (
    <ProjectDisplayBody
      title={t('Charity projects with tax benefits')}
      description={t('Make donations to these registered charities and claim tax deductions in your country')}
      projects={projects}
    />
  )
}
