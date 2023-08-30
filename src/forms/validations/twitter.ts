export const TwitterRegex =
  /^(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+)/

export function validateTwitterUrl(url?: string | null) {
  if (url) {
    const match = url.match(TwitterRegex)

    if (match && match.length >= 3) {
      const tweetId = match[2]
      return Boolean(tweetId)
    }

    return false
  }

  return false
}
