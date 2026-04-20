import { useMemo } from 'react'

import { DefaultMetaImage } from '@/shared/constants/platform/metaTags'
import { usePrerenderReady } from '@/shared/hooks/platform/usePrerenderReady.ts'
import { validateImageUrl } from '@/shared/markdown/validations/image.ts'

type ProjectSeoSource = {
  id?: string | null
  name?: string | null
  title?: string | null
  shortDescription?: string | null
  description?: string | null
  thumbnailImage?: string | null
  images?: Array<string | null> | null
}

type UseProjectPrerenderSeoProps = {
  project?: ProjectSeoSource | null
  loading: boolean
  initialRewardsLoading: boolean
}

export const useProjectPrerenderSeo = ({ project, loading, initialRewardsLoading }: UseProjectPrerenderSeoProps) => {
  const projectSeoImage = useMemo(() => {
    const thumbnailImage = project?.thumbnailImage || ''
    if (thumbnailImage && validateImageUrl(thumbnailImage)) {
      return thumbnailImage
    }

    const fallbackImage = project?.images?.find((image): image is string => Boolean(image) && validateImageUrl(image))
    return fallbackImage || ''
  }, [project?.thumbnailImage, project?.images])

  const hasSeoTitle = Boolean((project?.title || '').trim())
  const hasCoreSeoData = !loading && Boolean(project?.id) && hasSeoTitle

  const { isPrerenderRuntime } = usePrerenderReady({ prerenderReady: hasCoreSeoData })

  return {
    isPrerenderRuntime,
    shouldRenderJsonLd: !loading && (!initialRewardsLoading || isPrerenderRuntime),
    seoTitle: project?.title || undefined,
    seoDescription: project?.shortDescription || project?.description || undefined,
    seoImage: projectSeoImage || DefaultMetaImage,
    seoCanonicalUrl: project?.name ? `https://geyser.fund/project/${project.name}` : undefined,
  }
}
