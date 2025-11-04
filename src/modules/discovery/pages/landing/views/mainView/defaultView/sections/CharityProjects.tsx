import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchCharityProjectsData } from '@/api/airtable.ts'

import { ProjectCategory, ProjectSubCategory, useProjectsForLandingPageQuery } from '../../../../../../../../types'
import { ProjectDisplayBody, ProjectDisplayBodySkeleton } from '../components/ProjectDisplayBody'

interface ProjectDisplayProps {
  category?: ProjectCategory
  subCategory?: ProjectSubCategory
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

export const CharityProjects = ({ category, subCategory }: ProjectDisplayProps) => {
  const { t } = useTranslation()

  const [projectList, setProjectList] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
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
  }, [])

  const { loading, data } = useProjectsForLandingPageQuery({
    skip: isLoading || projectList.length === 0,
    variables: {
      input: {
        where: {
          ids: projectList,
        },
      },
    },
  })

  if (loading || isLoading) {
    return <ProjectDisplayBodySkeleton />
  }

  const projects = data?.projectsGet.projects || []

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
