export function validateTwitterUrl(url?: string | null) {
  if (url) {
    const regExp =
      /https?:\/\/(?:www\.)?twitter\.com\/[A-Za-z0-9_]+\/status\/\d+/

    const match = url.match(regExp)

    return Boolean(match?.length)
  }

  return false
}
