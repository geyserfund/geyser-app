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
    return 'nostrhackweek'
  }

  return ''
}

const productionTagsList = [
  { label: 'bitcoin-education', id: 9 },

  { label: 'bitcoin-culture', id: 6 },

  { label: 'bitcoin-community', id: 13 },

  { label: 'games', id: 19 },

  { label: 'artists', id: 39 },

  { label: 'films', id: 57 },

  { label: 'meetup', id: 68 },

  { label: 'translation', id: 37 },

  { label: 'nostr', id: 2 },

  { label: 'open-source', id: 4 },

  { label: 'podcasts', id: 7 },

  { label: 'developers', id: 3 },

  { label: 'giveaways', id: 40 },

  { label: 'earn', id: 42 },

  { label: 'maker', id: 49 },

  { label: 'bitcoin-book', id: 70 },

  { label: 'events', id: 1 },

  { label: 'sports', id: 43 },
]
