import * as React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from 'react-router'

import {
  DefaultMetaDescription,
  DefaultMetaImage,
  DefaultMetaTitle,
  DefaultMetaTwitterCard,
  DefaultMetaTwitterSite,
  DefaultMetaType,
} from '../shared/constants'
type HeadProps = {
  title?: string
  description?: string
  image?: string
  type?: string
  children?: React.ReactNode
  url?: string
}

export const Head: React.FC<HeadProps> = (tags) => {
  const {
    title = DefaultMetaTitle,
    description = DefaultMetaDescription,
    image = DefaultMetaImage,
    type = DefaultMetaType,
    children,
    url,
  } = tags
  const location = useLocation()
  const pageOrigin = typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.host}` : 'https://geyser.fund'
  const cleanTitle = title?.trim() || DefaultMetaTitle
  const cleanDescription = description?.trim() || DefaultMetaDescription
  const cleanImage = image?.trim() || DefaultMetaImage
  const pageUrl = url || `${pageOrigin}${location.pathname}`
  const documentTitle = cleanTitle.includes('Geyser') ? cleanTitle : `${cleanTitle} | Geyser`

  return (
    <Helmet>
      <title>{documentTitle}</title>
      <meta name="description" content={cleanDescription} />
      <meta property="og:title" content={cleanTitle} />
      <meta property="og:description" content={cleanDescription} />
      <meta property="og:image" content={cleanImage} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content={DefaultMetaTwitterCard} />
      <meta name="twitter:site" content={DefaultMetaTwitterSite} />
      <meta name="twitter:title" content={cleanTitle} />
      <meta name="twitter:description" content={cleanDescription} />
      <meta name="twitter:image" content={cleanImage} />
      <link rel="canonical" href={pageUrl} />
      {children}
    </Helmet>
  )
}
