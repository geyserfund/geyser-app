import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router'

import {
  DefaultMetaDescription,
  DefaultMetaImage,
  DefaultMetaKeywords,
  DefaultMetaRobots,
  DefaultMetaTitle,
  DefaultMetaTwitterCard,
  DefaultMetaTwitterSite,
  DefaultMetaType,
} from '../shared/constants'
import { formatHeadTitle, resolveCanonicalUrl } from './headUtils.ts'
type HeadProps = {
  title?: string
  description?: string
  image?: string
  type?: string
  children?: React.ReactNode
  url?: string
  keywords?: string
  robots?: string
}

export const Head: React.FC<HeadProps> = (tags) => {
  const {
    title = DefaultMetaTitle,
    description = DefaultMetaDescription,
    image = DefaultMetaImage,
    type = DefaultMetaType,
    children,
    url,
    keywords = DefaultMetaKeywords,
    robots = DefaultMetaRobots,
  } = tags
  const location = useLocation()
  const pageUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`
  const canonicalUrl = resolveCanonicalUrl(pageUrl, url)
  const headTitle = formatHeadTitle(title)

  return (
    <Helmet>
      <title>{headTitle}</title>
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      {robots && <meta name="robots" content={robots} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:secure_url" content={image} />}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="Geyser" />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content={DefaultMetaTwitterCard} />
      <meta name="twitter:site" content={DefaultMetaTwitterSite} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
      <link rel="canonical" href={canonicalUrl} />
      {children}
    </Helmet>
  )
}
