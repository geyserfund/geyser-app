const GEYSER_BRAND_NAME = 'Geyser'

export const formatHeadTitle = (title: string): string => {
  const trimmedTitle = title.trim()

  if (!trimmedTitle) {
    return GEYSER_BRAND_NAME
  }

  if (new RegExp(`\\b${GEYSER_BRAND_NAME}\\b`, 'i').test(trimmedTitle)) {
    return trimmedTitle
  }

  return `${trimmedTitle} | ${GEYSER_BRAND_NAME}`
}

export const resolveCanonicalUrl = (pageUrl: string, url?: string): string => {
  return url || pageUrl
}
