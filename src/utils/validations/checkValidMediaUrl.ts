import { vimeoUrlRegex, youtubeUrlRegex } from './regex'

export const isValidMediaUrl = (url: string) => {
  try {
    new URL(url)
  } catch (error) {
    return false
  }

  return youtubeUrlRegex.test(url) || vimeoUrlRegex.test(url)
}
