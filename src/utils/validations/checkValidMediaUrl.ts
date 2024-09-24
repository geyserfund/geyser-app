import { imageUrlRegex, vimeoUrlRegex, youtubeUrlRegex } from './regex'

export const isValidMediaUrl = (url: string) => {
  try {
    new URL(url)
  } catch (error) {
    return false
  }

  return imageUrlRegex.test(url) || youtubeUrlRegex.test(url) || vimeoUrlRegex.test(url)
}
