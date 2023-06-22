export const validateImageUrl = (url?: string | null) => {
  if (url) {
    const regExp = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png|WEBP)/gi

    const match = url.match(regExp)

    return Boolean(match?.length)
  }

  return false
}
