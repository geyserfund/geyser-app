export const TwitterRegex =
  /^https?:\/\/(?:www\.|mobile\.)?(?:x\.com|twitter\.com)\/(?:#!\/)?(?:\w+\/status(?:es)?\/(\d+)|i\/web\/status\/(\d+))(?:\/.*)?(?:\?.*)?$/i

/** Extracts tweet ID from supported x.com and twitter.com status URLs. */
export const extractTweetIdFromUrl = (url?: string | null): string | null => {
  if (!url) {
    return null
  }

  const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`

  try {
    const parsedUrl = new URL(normalizedUrl)
    const hostname = parsedUrl.hostname.replace(/^www\./i, '').replace(/^mobile\./i, '')

    if (hostname !== 'x.com' && hostname !== 'twitter.com') {
      return null
    }

    const match = parsedUrl.href.match(TwitterRegex)
    const tweetId = match?.[1] || match?.[2]

    return tweetId || null
  } catch {
    return null
  }
}

export function validateTwitterUrl(url?: string | null) {
  return Boolean(extractTweetIdFromUrl(url))
}
