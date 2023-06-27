export const validateImageUrl = (url?: string | null) => {
  if (url) {
    const regExp =
      /^(?:https:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+(?:png|jpg|jpeg|gif|webp)+$/gi

    const match = url.match(regExp)

    return Boolean(match?.length)
  }

  return false
}
