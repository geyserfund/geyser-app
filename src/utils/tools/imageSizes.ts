export enum imageSize {
  large = 'image_large.webp',
  medium = 'image_medium.webp',
  small = 'image_small.webp',
}

export const toLargeImageUrl = (url: string) => {
  if (!url || !url.includes('/image_')) {
    return url
  }

  return `${url.split('/image_')[0]}/${imageSize.large}`
}

export const toMediumImageUrl = (url: string) => {
  if (!url || !url.includes('/image_')) {
    return url
  }

  return `${url.split('/image_')[0]}/${imageSize.medium}`
}

export const toSmallImageUrl = (url: string) => {
  if (!url || !url.includes('/image_')) {
    return url
  }

  return `${url.split('/image_')[0]}/${imageSize.small}`
}
