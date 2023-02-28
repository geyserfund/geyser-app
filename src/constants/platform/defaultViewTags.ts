import { __development__, __production__, __staging__ } from '../config'

export const getListOfTags = () => {
  if (__development__) {
    return [
      { label: 'education', id: 41 },
      { label: 'culture', id: 42 },
      { label: 'communities', id: 43 },
      { label: 'games', id: 44 },
    ]
  }

  if (__staging__) {
    return [
      { label: 'development', id: 1 },
      { label: 'education', id: 2 },
      { label: 'culture', id: 3 },
      { label: 'testing', id: 4 },
      { label: 'crowdfunding', id: 13 },
    ]
  }

  if (__production__) {
    return []
  }

  return []
}

export const getFeaturedProject = () => {
  if (__development__) {
    return 'bitcoinconferenceinlagos'
  }

  if (__staging__) {
    return 'geyser'
  }

  if (__production__) {
    return ''
  }

  return ''
}
