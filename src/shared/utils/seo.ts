import { AI_SEO_SITE_ORIGIN } from '@/shared/constants/platform/aiSeo.ts'

export type CollectionJsonLdListItem = {
  name: string
  path: string
  description?: string
}

export type CollectionJsonLdInput = {
  name: string
  description: string
  path: string
  about?: string[]
  keywords?: string
  items?: CollectionJsonLdListItem[]
}

const resolveAbsoluteSeoUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }

  if (path.startsWith('/')) {
    return `${AI_SEO_SITE_ORIGIN}${path}`
  }

  return `${AI_SEO_SITE_ORIGIN}/${path}`
}

export const buildCollectionPageJsonLd = ({
  name,
  description,
  path,
  about = [],
  keywords,
  items = [],
}: CollectionJsonLdInput): string => {
  const mainEntity = {
    '@type': 'ItemList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: resolveAbsoluteSeoUrl(item.path),
      ...(item.description ? { description: item.description } : {}),
    })),
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: resolveAbsoluteSeoUrl(path),
    inLanguage: 'en',
    ...(about.length > 0 ? { about } : {}),
    ...(keywords ? { keywords } : {}),
    mainEntity,
  })
}

export const getAbsoluteSeoUrl = (path: string): string => {
  return resolveAbsoluteSeoUrl(path)
}
