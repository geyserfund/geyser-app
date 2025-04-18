import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { fetchCharityProjectsData } from '@/api/airtable.ts'

import { ProjectCategory, ProjectSubCategory, useProjectsForLandingPageQuery } from '../../../../../../../types'
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

  const [projectList, setProjectList] = useState<CharityProjects[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    fetchCharityProjectsData().then((data: AirtableResponse) => {
      // Transform the Airtable response to our FeaturedWallet format
      const wallets = data.records.map((record) => ({
        ...record.fields,
      }))
      setProjectList(wallets)
      setIsLoading(false)
    })
  }, [])

  const { loading, data } = useProjectsForLandingPageQuery({
    skip: isLoading || projectList.length === 0,
    variables: {
      input: {
        where: {
          ids: projectList.map((project) => project.projectId),
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

  return <ProjectDisplayBody title={t('Charity projects with Tax benefits')} projects={projects} />
}
