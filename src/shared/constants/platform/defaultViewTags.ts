import { __development__, __production__, __staging__ } from '../config'

export const getListOfTags = () => {
  if (__development__) {
    return productionTagsList
  }

  if (__staging__) {
    return productionTagsList
  }

  if (__production__) {
    return productionTagsList
  }

  return []
}

export const getFeaturedProject = () => {
  if (__development__) {
    return 'nostrhackweek'
  }

  if (__staging__) {
    return 'nostrhackweek'
  }

  if (__production__) {
    return 'miprimerbitcoin'
  }

  return ''
}

const productionTagsList = [
  { label: 'collectibles', id: 97 },
  { label: 'books', id: 248 },
  { label: 'education', id: 53 },
  { label: 'culture', id: 133 },
  { label: 'circular-economy', id: 133 },
  { label: 'humanitarian', id: 15 },
  { label: 'community', id: 555 },
  { label: 'films', id: 57 },
  { label: 'games', id: 19 },
  { label: 'privacy', id: 178 },
  { label: 'nostr', id: 2 },
  { label: 'orange-pilling', id: 10 },
  { label: 'startup', id: 11 },
  { label: 'open-source', id: 4 },
  { label: 'developers', id: 3 },
  { label: 'events', id: 1 },
  { label: 'media', id: 8 },
  { label: 'sports', id: 43 },
  { label: 'creative', id: 75 },
]
