export function validateYouTubeUrl(url?: string | null) {
  if (url) {
    const regExp =
      /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|live\/|v\/)?)([\w-]+)(\S+)?$/

    const match = url.match(regExp)

    return Boolean(match?.length)
  }

  return false
}

export function getVideoIdFromUrl(url?: string | null) {
  if (url) {
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)

    console.log(match)

    if (match && match[7]?.length === 11) {
      return match[7]
    }
  }

  return null
}
