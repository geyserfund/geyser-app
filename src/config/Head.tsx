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
  const pageUrl = `${window.location.protocol}//${window.location.host}${location.pathname}`

  return (
    <Helmet>
      <title>{title} | Geyser</title>
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {description && <meta name="description" content={description} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:secure_url" content={image} />}
      <meta property="og:url" content={pageUrl} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content={DefaultMetaTwitterCard} />
      <meta name="twitter:site" content={DefaultMetaTwitterSite} />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
      {url && <link rel="canonical" href={url} />}
      {children}
    </Helmet>
  )
}
