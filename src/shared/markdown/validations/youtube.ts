export function validateYouTubeUrl(url?: string | null) {
  if (url) {
    const regExp =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|live\/|v\/)?)([\w-]+)(\S+)?$/

    const match = url.match(regExp)

    return Boolean(match?.length)
  }

  return false
}
