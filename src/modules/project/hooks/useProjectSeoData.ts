import { useMemo } from 'react'
import { useParams } from 'react-router'

import { useProjectPageBodyQuery } from '@/types/index.ts'

type UseProjectSeoDataOptions = {
  projectName?: string
  skip?: boolean
}

/**
 * Returns project SEO fields from direct Apollo query data (not Jotai timing).
 * @param options Optional explicit projectName override and skip control.
 */
export const useProjectSeoData = (options?: UseProjectSeoDataOptions) => {
  const params = useParams<{ projectName: string }>()
  const projectName = options?.projectName || params.projectName
  const shouldSkip = Boolean(options?.skip || !projectName)

  const { data, loading } = useProjectPageBodyQuery({
    skip: shouldSkip,
    fetchPolicy: 'cache-first',
    variables: {
      where: { name: projectName || '' },
    },
  })

  const project = data?.projectGet

  const descriptor = useMemo(() => {
    const resolvedProjectName = project?.name || projectName || ''
    const title = project?.title?.trim() || project?.name?.trim() || ''
    const description = (project?.shortDescription || project?.description || '').trim()
    const image = project?.thumbnailImage || project?.images?.[0] || ''
    const url = resolvedProjectName ? `https://geyser.fund/project/${resolvedProjectName}` : undefined

    return {
      title,
      description,
      image,
      type: 'article',
      url,
      projectName: resolvedProjectName,
    }
  }, [project, projectName])

  return { loading, project, descriptor }
}
