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
    return 'triible'
  }

  return ''
}

const productionTagsList = [
  { label: 'bitcoin-education', id: 9 },
  { label: 'bitcoin-culture', id: 6 },
  { label: 'bitcoin-community', id: 13 },
  { label: 'films', id: 57 },
  { label: 'collectibles', id: 97 },
  { label: 'orange-pilling', id: 10 },
  { label: 'nostr', id: 2 },
  { label: 'games', id: 19 },
  { label: 'podcasts', id: 7 },
  { label: 'translation', id: 37 },
  { label: 'humanitarian', id: 15 },
  { label: 'open-source', id: 4 },
  { label: 'developers', id: 3 },
  { label: 'events', id: 1 },
  { label: 'media', id: 8 },
  { label: 'sports', id: 43 },
  { label: 'bitcoin-films', id: 134 },
  { label: 'maker', id: 49 },
  { label: 'earn', id: 42 },
  { label: 'creative', id: 75 },
]
