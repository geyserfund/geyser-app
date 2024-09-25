const youutubeUrlMatchRegex =
  /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i
export const extractYoutubeVideoId = (url: string) => {
  if (typeof url !== 'string') {
    return null
  }

  const match = url.match(youutubeUrlMatchRegex)

  if (match && match[1]) {
    return match[1]
  }

  return null
}

const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?(?:player\.)?vimeo\.com\/(?:video\/|embed\/|watch\?v=|)?(\d+)(?:\S+)?/

export const extractVimeoVideoId = (url: string) => {
  if (typeof url !== 'string') {
    return null
  }

  const match = url.match(vimeoRegex)

  if (match && match[1]) {
    return match[1]
  }

  return null
}

export const getYouTubeThumbnailFromId = (id: string | null) => (id ? `https://img.youtube.com/vi/${id}/0.jpg` : '')
export const getVimeoThumbnailFromId = (id: string | null) => (id ? `https://vumbnail.com/${id}.jpg` : '')

export const getYoutubeThumbailFromLink = (link: string) => {
  const id = extractYoutubeVideoId(link)
  return getYouTubeThumbnailFromId(id)
}

export const getVimeoThumbailFromLink = (link: string) => {
  const id = extractVimeoVideoId(link)
  return getVimeoThumbnailFromId(id)
}
